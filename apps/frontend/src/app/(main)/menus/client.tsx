'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation';

import { TreeView, TreeDataItem } from '@/components/ui/tree-view'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { FormViewer } from '@/components/Viewers/FormViewer';
import { MutationButton } from '@/components/Buttons';

import { updateAllMenusViaBff } from '@/services/client/MenuClientService';
import { IMainMenuProps } from '@/types/components/MenuType'
import { IFormFieldProps } from '@/types/components/ViewType';

/**
 * 메뉴 뷰어
 * @param param
 * @returns 
 */
export const MenuViewer = ( { menuData, fields } : { menuData : IMainMenuProps[], fields : IFormFieldProps<IMainMenuProps>[] } ) => {
    const [ menuItems, setMenuItems ] = useState<IMainMenuProps[]>( menuData );
    const [ selectedId, setSelectedId ] = useState<string | null>( null );
    const router = useRouter();
    
    // 아이템 정보를 Tree에 적용하기 위한 데이터로 변환
    function convertToTreeDataItem( menu : IMainMenuProps ) : TreeDataItem {
      const hasChildren = menu.children && menu.children.length > 0
      return {
        id : menu.menuId,
        name : menu.menuNm,
        onClick : () => setSelectedId( menu.menuId ),
        children : hasChildren ? menu.children?.map( convertToTreeDataItem ) : undefined,
        draggable : true
      }
    }

    const treeData : TreeDataItem[] = menuItems.map( convertToTreeDataItem );

    // FormViewer의 onUpdate 콜백 함수
    const handleFormUpdate = ( updatedData: IMainMenuProps ) => {
        setMenuItems( prev => updateMenuItem( prev, updatedData ) );
    };

    // 선택된 메뉴 데이터 찾기
    const selectedMenu = findSelectedMenu( menuItems, selectedId || '' );

    // 정상, 오류 콜백
    const handleCallback = () => {
        router.refresh();
    }

    return (
        <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="text-sm leading-6 font-semibold flex justify-between items-center">
                        <span>메뉴 목록</span>
                        <div className="flex justify-start my-2">
                            <Button variant="ghost" className="text-gray-500" type="button">
                                <PlusCircle className="h-4 w-4 mr-2" />
                                행 추가
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <TreeView data={ treeData }
                            onDocumentDrag={ ( sourceItem, targetItem ) => {
                                // 여기서 setMenuItems 사용 가능
                                setMenuItems( prev => {
                                    const [ moved, removed ] = findAndRemove( prev, sourceItem.id );
                                    
                                    if ( !moved ) {
                                        return prev;
                                    }
                                    const isBack = isSiblingAndInFront( sourceItem.id, targetItem.id, prev );
                                    const isLeaf = hasLinkUrl( prev, targetItem.id );
                                    const inserted = insertInto( removed, targetItem.id, moved, isLeaf, isBack );
                                    return reassignSortOrd( inserted );
                                } )
                            } }
                        />
                    </CardContent>
                </Card>
                <div className="col-span-2">
                    <FormViewer data={ selectedMenu || { menuId : '', menuNm : '', sortOrd : 0, useYn : 'Y' } } fields={ fields } onUpdate={ handleFormUpdate } />
                </div>
            </div>
            <div className="grid grid-cols-2 py-4">
                <div className="flex items-center space-x-2">
                </div>
                <div className="flex items-center justify-end space-x-2">
                    <MutationButton
                        className="text-white"
                        mutationFn={ updateAllMenusViaBff }
                        variables={ { data : menuItems } }
                        queryKeyToInvalidate={ [ ] }
                        onSuccessCallback={ handleCallback }
                        onErrorCallback={ handleCallback }
                    >
                        변경사항저장
                    </MutationButton>
                </div>
            </div>
        </>
    )
}

/**
 * menuId를 기준으로 메뉴 트리를 탐색하여 데이터를 업데이트하는 함수
 * @param items
 * @param updatedData
 * @returns
 */
const updateMenuItem = ( items: IMainMenuProps[], updatedData: IMainMenuProps ) : IMainMenuProps[] => {
    // 배열의 각 항목을 순회하며 새로운 배열을 반환합니다.
    return items.map( item => {
        // 현재 항목의 menuId가 업데이트할 데이터의 menuId와 일치하면
        if ( item.menuId === updatedData.menuId ) {
            // 해당 항목을 updatedData로 교체합니다.
            return updatedData;
        }

        // 현재 항목에 children이 있으면 재귀적으로 자식들을 탐색합니다.
        if ( item.children ) {
            return {
                ...item,
                children: updateMenuItem( item.children, updatedData ),
            };
        }

        // 일치하는 항목이 없으면 기존 항목을 그대로 반환합니다.
        return item;
    });
};

/**
 * 메뉴 트리에서 ID에 해당하는 자료 삭제
 * @param items 
 * @param id 
 * @returns [ 삭제된Item, 삭제된 목록 ]
 */
const findAndRemove = ( items : IMainMenuProps[], id : string ) : [ IMainMenuProps | null, IMainMenuProps[] ] => {
    for ( let i = 0; i < items.length; i++ ) {
        const item = items[ i ];

        if ( item.menuId === id ) {
            const copy = [ ...items ];
            copy.splice( i, 1 );

            return [ item, copy ];
        }

        if ( item.children ) {
            const [ found, newChildren ] = findAndRemove( item.children, id );

            if ( found ) {
                const copy = [ ...items ];
                copy[ i ] = { ...item, children: newChildren };
                return [ found, copy ];
            }
        }
    }
    return [ null, items ];
}

/**
 * 특정 ID의 메뉴 아래 또는 앞에 새로운 항목을 삽입하는 함수
 * @param items
 * @param targetId
 * @param newItem
 * @param isLeaf
 * @returns
 */
const insertInto = ( items : IMainMenuProps[], targetId : string, newItem : IMainMenuProps, isLeaf : boolean, isBack : boolean ) : IMainMenuProps[] => {
    // 재귀를 위한 내부 함수
    function insertRecursive( currentItems : IMainMenuProps[] ) : IMainMenuProps[] {
        const newItems : IMainMenuProps[] = [];
        
        for ( const item of currentItems ) {
            // targetId를 찾았을 경우
            if ( item.menuId === targetId ) {
                // 최하위 노드 일 경우
                if ( isLeaf ) {
                    // 정렬 기준이 뒤일 경우
                    if( isBack ){
                        // 해당 노드 뒤에 newItem을 추가 (형제로)
                        newItems.push( { ...item } );
                        newItems.push( { ...newItem, upMenuId: item.upMenuId } );

                    } else {
                        // 해당 노드 앞에 newItem을 추가 (형제로)
                        newItems.push({ ...newItem, upMenuId: item.upMenuId });
                        newItems.push({ ...item });
                    }

                } else {
                    // 최하위 노드가 아닌 경우, 해당 노드의 자식으로 newItem을 추가
                    newItems.push( {
                        ...item,
                        children: [ ...( item.children || [] ), { ...newItem, upMenuId: item.menuId } ],
                    } );
                }
            } else {
                // targetId를 찾지 못한 경우
                if ( item.children && item.children.length > 0 ) {
                    // 자식이 있다면 재귀 호출
                    newItems.push( { ...item, children: insertRecursive( item.children ) } );
                } else {
                    newItems.push( { ...item } );
                }
            }
        }
        return newItems;
    }
    
    return insertRecursive( items );
}

/**
 * sortOrd 재계산
 * @param items 
 * @returns 
 */
const reassignSortOrd = ( items : IMainMenuProps[] ) : IMainMenuProps[] => {
    return items.map( ( child, idx ) => ({
        ...child,
        sortOrd: idx + 1,
        children: child.children ? reassignSortOrd( child.children ) : undefined,
    } ) )
}


/**
 * menuData 중 selectedMenuId에 해당하는 데이터 조회
 * @param menuData
 * @param selectedMenuId
 * @returns
 */
const findSelectedMenu = ( menuData : IMainMenuProps[], selectedMenuId : string ) : IMainMenuProps | null => {
    for ( const menu of menuData ) {
        // 현재 메뉴가 찾는 menuId인지 확인합니다.
        if ( menu.menuId === selectedMenuId ) {
            // linkUrl 속성이 존재하고 값이 있으면 true 반환
            return menu;
        }

        // children이 있는 경우 재귀적으로 탐색
        if ( menu.children && menu.children.length > 0 ) {
            const found = findSelectedMenu( menu.children, selectedMenuId );
            if ( found ) {
                return found;
            }
        }
    }

    return null;
}

/**
 * 주어진 menuId에 해당하는 메뉴 데이터의 linkUrl 존재 여부를 확인하는 함수
 * @param menuData
 * @param selectedMenuId
 * @returns
 */
const hasLinkUrl = ( menuData : IMainMenuProps[], selectedMenuId : string ) : boolean => {
    // menuData 중 selectedMenuId에 해당하는 데이터 조회
    const selectedMenu = findSelectedMenu(menuData, selectedMenuId);

    // 선택된 데이터가 있을 경우
    if(selectedMenu){
        // 링크 속성이 있고 값이 있으면 true
        return !!selectedMenu.linkUrl;
    }

    // 그 외 false
    return false;
}

/**
 * 두 메뉴 ID가 같은 형제 노드이며, sourceMenuId가 targetMenuId보다 배열상 앞에 있는지 확인
 * @param sourceMenuId
 * @param targetMenuId
 * @param menuData
 * @returns
 */
function isSiblingAndInFront( sourceMenuId: string, targetMenuId: string, menuData: IMainMenuProps[] ) : boolean {
    // 재귀를 위한 내부 함수
    function findAndCompare( items: IMainMenuProps[] ) : boolean {
        if ( !items || items.length === 0 ) {
            return false;
        }

        const sourceIndex = items.findIndex( item => item.menuId === sourceMenuId );
        const targetIndex = items.findIndex( item => item.menuId === targetMenuId );

        // 두 ID가 모두 이 배열에 존재하고, sourceIndex가 targetIndex보다 작으면 true 반환
        if ( sourceIndex !== -1 && targetIndex !== -1 ) {
            return sourceIndex < targetIndex;
        }

        // 현재 배열에서 찾지 못했다면 자식 노드들을 재귀적으로 탐색
        for ( const item of items ) {
            if ( item.children && item.children.length > 0 ) {
                if ( findAndCompare( item.children ) ) {
                    return true;
                }
            }
        }

        return false;
    }

    return findAndCompare( menuData );
}