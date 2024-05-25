import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import CustomList from "./CustomList";
import CustomForm from "./CustomForm";
import {
    changeSelectedRows,
    changeSpinnerSearch,
    dynamicFilter,
    getData,
    order,
    page,
    search,
} from "../../store/EmployeeList";
import { PermissionsContext } from "../../store/Permissions";
import { PERMISSIONS_MAP, RELOAD_DATA_TIMEOUT } from "../../constants";

const EmployeeList = () => {
    const [searchParams] = useSearchParams();
    const _search = useSelector(search);
    const _page = useSelector(page);
    const _order = useSelector(order);
    const _dynamicFilter = useSelector(dynamicFilter);
    const dispatch = useDispatch();
    const [isLoadFirstTime, setIsLoadFirstTime] = useState(true);

    useEffect(() => {
        dispatch(getData());
        setIsLoadFirstTime(false);
        document.title = "Quản lý đăng nhập";
    }, []);

    const fetchData = () => {
        dispatch(changeSelectedRows([]));
        dispatch(changeSpinnerSearch(true));
        dispatch(getData());
    };

    useEffect(() => {
        if (isLoadFirstTime === false) {
            fetchData();
        }
    }, [_search, _page, _order]);

    const functionChange = () => {
        fetchData();
    };
    const handlerSearch = useCallback(
        debounce((nextValue) => functionChange(nextValue), 500),
        []
    );
    const handleOnChangeFilter = () => {
        handlerSearch();
    };
    useEffect(() => {
        if (isLoadFirstTime === false) {
            handleOnChangeFilter();
        }
    }, [_dynamicFilter]);

    const handleRenderByViewType = () => {
        switch (searchParams.get("view_type")) {
            case "list":
                return <CustomList />;
            case "form":
                return <CustomForm />;
            default:
                return <CustomList />;
        }
    };

    return handleRenderByViewType();
};

export default EmployeeList;
