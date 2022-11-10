import React, { memo } from 'react';
import Spinner from '../components/Spinner';
import Table from '../components/Table';

// 에러정보를 표시하기 위한 컴포넌트
import ErrorView from '../components/ErrorView';

// 상태값을 로드하기 위한 hook과 action함수를 dispatch할 hook 참조
import { useSelector, useDispatch } from 'react-redux';
// Slice에 정의된 액션함수들 참조
import { getList } from '../slices/DepartmentSlice';
import { useEffect } from 'react';

const Department = memo(() => {
    // hook을 통해 slice가 관리하는 상태값 가져오기
    const { data, loading, error } = useSelector((state) => state.DepartmentSlice);

    // dispatch 함수 생성
    const dispatch = useDispatch();

    // 컴포넌트가 마운트되면 데이터 조회를 위한 액션함수를 디스패치 함
    useEffect(() => {
        dispatch(getList());
    },[dispatch]);

    console.log(data);

  return (
    <div>
        <Spinner loading={loading} />
        {error? (
            <ErrorView error={error} />
        ) : (
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>dame</th>
                        <th>loc</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((v, i) => (
                        <tr key={i}>
                           <td>{v.id}</td>
                            <td>{v.dname}</td>
                            <td>{v.loc}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </div>
  )
});

export default Department;