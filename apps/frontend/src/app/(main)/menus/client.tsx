'use client'

import { useState } from 'react'
import { TreeView, TreeDataItem } from '@/components/ui/tree-view'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { IMainMenuProps } from '@/types/components/MenuType'
import { FormViewer } from '@/components/Viewers/FormViewer';
import { IFormFieldProps } from '@/types/components/ViewType';

// 입력 / 수정 필드 레이아웃 정의
const fields : IFormFieldProps<IMainMenuProps>[] = [
    { key: 'menuId', label: '메뉴ID', colSpan: 6, formType: 'viewer', required : true },
    { key: 'menuNm', label: '메뉴명', colSpan: 6, formType: 'text', required : true },
    { key: 'linkUrl', label: '링크URL', colSpan: 6, formType: 'text', required : false },
    { key: 'iconCd', label: '아이콘', colSpan: 6, formType: 'text', required : false },
    { key: 'sortOrd', label: '정렬순서', colSpan: 6, formType: 'viewer', required : false },
    { key: 'useYn', label: '사용여부', colSpan: 6, formType: 'text', required : false },
];

/**
 * 메뉴 뷰어
 * @param param
 * @returns 
 */
export const MenuViewer = ( { menuData } : { menuData : IMainMenuProps[] } ) => {
    const [menuItems, setMenuItems] = useState<IMainMenuProps[]>( menuData );
    const [selectedId, setSelectedId] = useState<number | null>(null);
    
    // 아이템 정보를 Tree에 적용하기 위한 데이터로 변환
    function convertToTreeDataItem(menu: IMainMenuProps): TreeDataItem {
      const hasChildren = menu.children && menu.children.length > 0
      return {
        id: String(menu.menuId),
        name: menu.menuNm,
        onClick: () => setSelectedId(menu.menuId),
        children: hasChildren ? menu.children?.map(convertToTreeDataItem) : undefined,
        draggable : true
      }
    }

    const treeData : TreeDataItem[] = menuItems.map(convertToTreeDataItem);

    // FormViewer의 onUpdate 콜백 함수
    const handleFormUpdate = ( updatedData: IMainMenuProps ) => {
        setMenuItems( prev => updateMenuItem(prev, updatedData) );
    };

    // 선택된 메뉴 데이터 찾기
    const selectedMenu = menuItems
        .flatMap(menu => [menu, ...(menu.children || [])])
        .find(menu => menu.menuId === selectedId)

    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardContent>
                    <TreeView data={ treeData }
                        onDocumentDrag={ ( sourceItem, targetItem ) => {
                            // 여기서 setMenuItems 사용 가능
                            setMenuItems( prev => {
                                const [ moved, removed ] = findAndRemove( prev, Number( sourceItem.id ) );
                                
                                if ( !moved ) {
                                    return prev;
                                }
                                const isBack = isSiblingAndInFront(Number(sourceItem.id), Number(targetItem.id), prev);
                                const isLeaf = hasLinkUrl(prev, Number(targetItem.id));
                                const inserted = insertInto( removed, Number(targetItem.id), moved, isLeaf, isBack );
                                return reassignSortOrd( inserted );
                            } )
                        }}
                    />
                </CardContent>
            </Card>
            <div className="col-span-2">
                <FormViewer data={ selectedMenu || { menuId : 0, menuNm : '', upMenuId : 0, sortOrd : 0 } } fields={ fields } onUpdate={ handleFormUpdate } />
            </div>
        </div>
    )
}

/**
 * menuId를 기준으로 메뉴 트리를 탐색하여 데이터를 업데이트하는 함수
 * @param items
 * @param updatedData
 * @returns
 */
const updateMenuItem = (items: IMainMenuProps[], updatedData: IMainMenuProps): IMainMenuProps[] => {
    // 배열의 각 항목을 순회하며 새로운 배열을 반환합니다.
    return items.map(item => {
        // 현재 항목의 menuId가 업데이트할 데이터의 menuId와 일치하면
        if (item.menuId === updatedData.menuId) {
            // 해당 항목을 updatedData로 교체합니다.
            return updatedData;
        }

        // 현재 항목에 children이 있으면 재귀적으로 자식들을 탐색합니다.
        if (item.children) {
            return {
                ...item,
                children: updateMenuItem(item.children, updatedData),
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
const findAndRemove = ( items : IMainMenuProps[], id : number ) : [ IMainMenuProps | null, IMainMenuProps[] ] => {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.menuId === id) {
            const copy = [...items];
            copy.splice(i, 1);

            return [item, copy];
        }

        if (item.children) {
            const [found, newChildren] = findAndRemove(item.children, id);
            if (found) {
                const copy = [...items];
                copy[i] = { ...item, children: newChildren };
                return [found, copy];
            }
        }
    }
    return [null, items];
}

/**
 * 특정 ID의 메뉴 아래 또는 앞에 새로운 항목을 삽입하는 함수
 * @param items
 * @param targetId
 * @param newItem
 * @param isLeaf
 * @returns
 */
const insertInto = ( items : IMainMenuProps[], targetId : number, newItem : IMainMenuProps, isLeaf : boolean, isBack : boolean ) : IMainMenuProps[] => {
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
                    newItems.push({
                        ...item,
                        children: [...(item.children || []), { ...newItem, upMenuId: item.menuId }],
                    });
                }
            } else {
                // targetId를 찾지 못한 경우
                if (item.children && item.children.length > 0) {
                    // 자식이 있다면 재귀 호출
                    newItems.push({ ...item, children: insertRecursive(item.children) });
                } else {
                    newItems.push({ ...item });
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
 * 주어진 menuId에 해당하는 메뉴 데이터의 linkUrl 존재 여부를 확인하는 함수
 * @param menuData
 * @param selectedMenuId
 * @returns
 */
const hasLinkUrl = (menuData: IMainMenuProps[], selectedMenuId: number): boolean => {
  for (const menu of menuData) {
    // 현재 메뉴가 찾는 menuId인지 확인합니다.
    if (menu.menuId === selectedMenuId) {
      // linkUrl 속성이 존재하고 값이 있으면 true 반환
      return !!menu.linkUrl;
    }

    // children이 있는 경우 재귀적으로 탐색
    if (menu.children && menu.children.length > 0) {
      const found = hasLinkUrl(menu.children, selectedMenuId);
      if (found) {
        return true;
      }
    }
  }

  // 전체를 탐색했지만 해당하는 메뉴를 찾지 못했거나 linkUrl이 없는 경우
  return false;
}

/**
 * 두 메뉴 ID가 같은 형제 노드이며, sourceMenuId가 targetMenuId보다 배열상 앞에 있는지 확인
 * @param sourceMenuId - 기준이 될 소스 메뉴 ID
 * @param targetMenuId - 비교 대상 타겟 메뉴 ID
 * @param menuData - 전체 메뉴 데이터 배열
 * @returns - 조건이 모두 충족되면 true, 아니면 false를 반환합니다.
 */
function isSiblingAndInFront(sourceMenuId: number, targetMenuId: number, menuData: IMainMenuProps[]): boolean {
  // 재귀를 위한 내부 함수
  function findAndCompare(items: IMainMenuProps[]): boolean {
    if (!items || items.length === 0) {
      return false;
    }

    const sourceIndex = items.findIndex(item => item.menuId === sourceMenuId);
    const targetIndex = items.findIndex(item => item.menuId === targetMenuId);

    // 두 ID가 모두 이 배열에 존재하고, sourceIndex가 targetIndex보다 작으면 true 반환
    if (sourceIndex !== -1 && targetIndex !== -1) {
      return sourceIndex < targetIndex;
    }

    // 현재 배열에서 찾지 못했다면 자식 노드들을 재귀적으로 탐색
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        if (findAndCompare(item.children)) {
          return true;
        }
      }
    }

    return false;
  }

  return findAndCompare(menuData);
}