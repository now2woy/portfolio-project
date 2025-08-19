"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { postKeys, fetchListPost, fetchInsPost, fetchUpdPost, fetchDelPost } from '@/service/PostService';
import { ISearchData, ISearchField } from "@/types/SearchType";
import { IColumnConfig } from "@/types/ColumnDefType";
import { authenticationProps } from '@/types/CommonType';
import { IPostProps } from "@/types/PostType";
import { DefaultSearch } from "@/components/Searchs";
import { Grid } from "@/components/Grids";
import { LinkButton, MutationButton } from '@/components/Buttons';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatDate } from '@/utils/DateUtils';

/**
 * TiptapEditor를 클라이언트 측에서 다이나믹 로드
 */
const TiptapEditor = dynamic(() => import('@/components/TipTaps').then(mod => mod.TiptapEditor), {
    ssr: false, // 서버 측 렌더링을 비활성화
    loading: () => null, // 로딩 중 보여줄 컴포넌트
});

/**
 * 게시글 목록 클라이언트 컴포넌트
 * @param param
 * @returns 
 */
export const List = ({ authentication, brdId, initialData, fields }: { authentication: authenticationProps, brdId: number, initialData : ISearchData, fields : ISearchField[] }) =>  {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams?.toString() ?? '';

    // 조회 버튼 헨들링
    const handleSearch = ( filters : ISearchData ) => {
        const params = new URLSearchParams(searchParams);
        Object.keys( filters ).forEach( key => {
            if ( filters[ key ] ) {
                params.set( key, filters[ key ] );
            }
        });

        router.push(`?${ params.toString() }`);
    }

    // 캐싱된 데이터 사용
    const { data, isLoading, isError } = useQuery( {
        queryKey: postKeys.lists(authentication, brdId, query)
        , queryFn: fetchListPost
    });

    // 게시글 목록 컬럼 정의
    const columnsConfig : IColumnConfig[] = [
        { key : 'postId', label : '번호', type : 'text', size : 40, align : 'center' },
        { key : 'postTtl', label : '제목', type : 'link', linkBaseUrl : '/posts', linkKeys : [ 'brdId', 'postId' ] },
        { key : 'writerId', label : '작성자ID', type : 'text', size : 100 },
        { key : 'delYn', label : '삭제여부', type : 'boolean', size : 70 },
        { key : 'insDt', label : '작성일시', type : 'date', size : 140 },
        { key : 'updDt', label : '수정일시', type : 'date', size : 140 },
        { type : 'actions', label : 'Actions', linkBaseUrl : '/posts', linkKeys : [ 'brdId', 'postId' ], linkAddUrl : '/edit', menu : [ '수정' ], size : 60 },
    ];

    return (
        <>
            <DefaultSearch initialData={ initialData } fields={ fields } handleSearch={ handleSearch } />
            {data && <Grid data={ data } columnsConfig={ columnsConfig } newUrl={`/posts/${ brdId }/new?${ query }`} />}
        </>
    );
}

/**
 * 게시글 신규/수정 클라이언트 컴포넌트
 * @param param
 * @returns 
 */
export const Edit = ( { authentication, brdId, postId, data }  : { authentication: authenticationProps, brdId : number, postId : number, data? : IPostProps }) => {
    const [modifyData, setModifyData] = useState<IPostProps>(data || {
        brdId: brdId,
        postTtl : '',
        postCtt : '',
        viewCnt: 0,
        delYn: 'N',
    });
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = new URLSearchParams(searchParams);

    // 신규 여부
    const isNew = data ? false : true;

    // 정상, 오류 콜백
    const handleCallback = () => {
        // 신규 일 경우
        if(isNew){
            // 목록 화면으로 이동
            router.push(`/posts/${ brdId }`);
        } else {
            // 상세 화면으로 이동
            router.push(`/posts/${ brdId }/${ postId }?${ query }`);
        }
    }
    
    // 에디터 내용이 업데이트될 때 호출되는 핸들러
    const handleEditorUpdate = (content: string) => {
        setModifyData({ ...modifyData, postCtt: content });
    };

    return (
        <>
            <div className="border border-gray-250 rounded-lg px-6">
                <dl className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="border-t pb-2 pt-4 px-4 sm:px-0 sm:col-span-2">
                        <dt><Label className="text-sm leading-6 font-semibold" htmlFor="postTtl">제목</Label></dt>
                        <dd className="mt-1 text-sm leading-6 text-muted-foreground mt-2">
                            <Input id="postTtl" name="postTtl" required value={ modifyData.postTtl } onChange={(e) => setModifyData({ ...modifyData, postTtl: e.target.value })} />
                        </dd>
                    </div>

                    <div className="border-t pb-2 pt-4 px-4 sm:px-0 sm:col-span-2">
                        <dt className="text-sm leading-6 font-semibold">내용</dt>
                        <dd className="mt-1 text-sm leading-6 text-muted-foreground mt-2">
                            <TiptapEditor content={modifyData.postCtt || ''}  onUpdate={ handleEditorUpdate } />
                        </dd>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-6 sm:col-span-2 gap-x-4">
                        <div className="border-t px-4 pb-2 pt-4 sm:col-span-3 sm:px-0">
                            <dt className="text-sm leading-6 font-semibold">입력일시</dt>
                            <dd className="mt-1 text-sm leading-6 text-muted-foreground mt-2">{ formatDate( modifyData.insDt ) }</dd>
                        </div>

                        <div className="border-t px-4 pb-2 pt-4 sm:col-span-3 sm:px-0">
                            <dt className="text-sm leading-6 font-semibold">수정일시</dt>
                            <dd className="mt-1 text-sm leading-6 text-muted-foreground mt-2">{ formatDate( modifyData.updDt ) }</dd>
                        </div>
                    </div>
                </dl>
            </div>

            <div className="grid grid-cols-2 py-4">
                <div className="flex items-center space-x-2">
                    <LinkButton name="목록" variant="outline" url={`/posts/${ brdId }?${query}`} />
                </div>
                <div className="flex items-center justify-end space-x-2">
                    {isNew && <MutationButton
                        className="text-white"
                        mutationFn={ fetchInsPost }
                        variables={{ authentication, brdId, data : modifyData }}
                        queryKeyToInvalidate={ [ "posts" ] }
                        onSuccessCallback={ handleCallback }
                        onErrorCallback={ handleCallback }
                    >
                        저장
                    </MutationButton>}
                    {!isNew && <MutationButton
                        className="text-white"
                        mutationFn={ fetchUpdPost }
                        variables={{ authentication, brdId, postId, data : modifyData }}
                        queryKeyToInvalidate={ [ "posts" ] }
                        onSuccessCallback={ handleCallback }
                        onErrorCallback={ handleCallback }
                    >
                        수정
                    </MutationButton>}
                </div>
            </div>
        </>
    );
}

/**
 * 게시글 상세 클라이언트 컴포넌트
 * @param param
 * @returns 
 */
export const View = ( { authentication, brdId, postId } : { authentication: authenticationProps, brdId: number, postId: number } ) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = new URLSearchParams(searchParams);

    // 정상, 오류 콜백
    const handleCallback = () => {
        // 목록 화면으로 이동
        router.push(`/posts/${ brdId }?${ query }`);
    }

    return (
        <div className="grid grid-cols-2 py-4">
            <div className="flex items-center space-x-2">
                <LinkButton name="목록" variant="outline" url={`/posts/${ brdId }?${query}`} />
            </div>
            <div className="flex items-center justify-end space-x-2">
                <LinkButton name="수정" className="text-white" url={`/posts/${ brdId }/${ postId }/edit?${query}`} />
                <MutationButton
                    className="text-white"
                    mutationFn={ fetchDelPost }
                    variables={{ authentication, brdId, postId }}
                    queryKeyToInvalidate={ [ "posts" ] }
                    onSuccessCallback={ handleCallback }
                    onErrorCallback={ handleCallback }
                >
                    삭제
                </MutationButton>
            </div>
        </div>
    )
}
