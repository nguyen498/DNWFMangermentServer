/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    fetchAdd, fetchDelete, fetchDeleteMulti, fetchGetByID, fetchGetList, fetchUpdate, getDriverCurrentSubmitedForms,
} from './API';
import { clog, formatFilterDynamicToTerm, tt } from '../../utils';
import { formatGetIDAndTitleBFSubmit } from './formatData';
import { showSuccess } from '../../components/dialogs';
import { PAGE_LIMIT } from '../../CONSTANT';
import { DRIVER_STATUS_MAP } from '../../constants';

const cleanForm = (state) => {
    state.roleName = '';
    state.roleDescription = '';
    state.systemExpandedKeys = [];
    state.systemAutoExpandParent = true;
    state.systemCheckedKeys = [];
    state.systemSelectedKeys = [];

    state.driverExpandedKeys = [];
    state.driverAutoExpandParent = true;
    state.driverCheckedKeys = [];
    state.driverSelectedKeys = [];

    state.supportExpandedKeys = [];
    state.supportAutoExpandParent = true;
    state.supportCheckedKeys = [];
    state.supportSelectedKeys = [];

    state.customerExpandedKeys = [];
    state.customerAutoExpandParent = true;
    state.customerCheckedKeys = [];
    state.customerSelectedKeys = [];

    state.vehiclesExpandedKeys = [];
    state.vehiclesAutoExpandParent = true;
    state.vehiclesCheckedKeys = [];
    state.vehiclesSelectedKeys = [];

    state.tripExpandedKeys = [];
    state.tripAutoExpandParent = true;
    state.tripCheckedKeys = [];
    state.tripSelectedKeys = [];

    state.notificationExpandedKeys = [];
    state.notificationAutoExpandParent = true;
    state.notificationCheckedKeys = [];
    state.notificationSelectedKeys = [];
    // state.prize = '';
    // // state.prizeUnder1 = '';
    // // state.prizeBetween1 = '';
    // state.commissionType = 2; // 1 percent 2 value
    // state.commission = 0;
    // state.commissionSaleType = 2; // 1 percent 2 value
    // state.commissionSale = 0;
    // state.rangeDate = null;
    // state.prizeStores = [];
    // state.isRange = true;
    // state.rangeDay = [];
    // state.rangeTime = [];
    // state.cover = null;
};
const handleInitCreate = (state) => {
    if (state.id) {
        cleanForm(state);
    }
    state.updateItem = null;
    state.id = null;
    state.spinnerCreate = false;
};
const handleInitUpdate = (state, action) => {
    const {
        permission_groups, id, display_name, description,
    } = action.payload;
    state.updateItem = action.payload;
    state.id = id;
    state.roleName = display_name;
    state.roleDescription = description;

    state.systemExpandedKeys = [];
    state.systemAutoExpandParent = true;
    state.systemCheckedKeys = permission_groups?.he_thong?.map(({ id }) => id);
    state.systemSelectedKeys = [];

    state.driverExpandedKeys = [];
    state.driverAutoExpandParent = true;
    state.driverCheckedKeys = permission_groups?.driver?.map(({ id }) => id);
    state.driverSelectedKeys = [];

    state.supportExpandedKeys = [];
    state.supportAutoExpandParent = true;
    state.supportCheckedKeys = permission_groups?.ho_tro?.map(({ id }) => id);
    state.supportSelectedKeys = [];

    state.customerExpandedKeys = [];
    state.customerAutoExpandParent = true;
    state.customerCheckedKeys = permission_groups?.nguoi_dung?.map(({ id }) => id);
    state.customerSelectedKeys = [];

    state.vehiclesExpandedKeys = [];
    state.vehiclesAutoExpandParent = true;
    state.vehiclesCheckedKeys = permission_groups?.phuong_tien?.map(({ id }) => id);
    state.vehiclesSelectedKeys = [];

    state.tripExpandedKeys = [];
    state.tripAutoExpandParent = true;
    state.tripCheckedKeys = permission_groups?.quan_ly_chuyen_di?.map(({ id }) => id);
    state.tripSelectedKeys = [];

    state.notificationExpandedKeys = [];
    state.notificationAutoExpandParent = true;
    state.notificationCheckedKeys = permission_groups?.thong_bao?.map(({ id }) => id);
    state.notificationSelectedKeys = [];

    state.spinnerCreate = false;
};

const initialState = {
    // LIST
    search: '',
    page: 1,
    limit: PAGE_LIMIT, // 25
    data: [],
    order: { order: 'created_at', sort: 'desc' },
    total: 0,
    selectedRows: [],
    spinnerSearch: false,

    // FILTER
    dynamicFilter: [],

    // CREATE
    id: null,
    updateItem: null,
    roleName: '',
    roleDescription: '',

    systemExpandedKeys: [],
    systemAutoExpandParent: true,
    systemCheckedKeys: [],
    systemSelectedKeys: [],

    driverExpandedKeys: [],
    driverAutoExpandParent: true,
    driverCheckedKeys: [],
    driverSelectedKeys: [],

    supportExpandedKeys: [],
    supportAutoExpandParent: true,
    supportCheckedKeys: [],
    supportSelectedKeys: [],

    customerExpandedKeys: [],
    customerAutoExpandParent: true,
    customerCheckedKeys: [],
    customerSelectedKeys: [],

    vehiclesExpandedKeys: [],
    vehiclesAutoExpandParent: true,
    vehiclesCheckedKeys: [],
    vehiclesSelectedKeys: [],

    tripExpandedKeys: [],
    tripAutoExpandParent: true,
    tripCheckedKeys: [],
    tripSelectedKeys: [],

    notificationExpandedKeys: [],
    notificationAutoExpandParent: true,
    notificationCheckedKeys: [],
    notificationSelectedKeys: [],

    spinnerCreate: false,
    showModalCreate: false,

    driverForms: {},

};

// API Call
export const getData = createAsyncThunk(
    'NewDriverManager/getData_DriverManager',
    async (_, { getState }) => {
        const {
            search, order, dynamicFilter, page, limit,
        } = getState().newDriverManager;
        const response = await fetchGetList({
            term: formatFilterDynamicToTerm(dynamicFilter, search),
            order: order?.order,
            sort: order?.sort,
            page,
            limit,
        });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const getItemByID = createAsyncThunk(
    'NewDriverManager/getItemByID_RoleManager',
    async (_) => {
        const { id } = _;
        const response = await fetchGetByID({ id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const quickGetItemByID = createAsyncThunk(
    'NewDriverManager/quickGetItemByID_RoleManager',
    async (_) => {
        const { id } = _;
        const response = await fetchGetByID({ id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const create = createAsyncThunk(
    'NewDriverManager/create_RoleManager',
    async (_, { getState, dispatch }) => {
        const {
            roleName,
            roleDescription,
            systemCheckedKeys,
            driverCheckedKeys,
            supportCheckedKeys,
            customerCheckedKeys,
            vehiclesCheckedKeys,
            tripCheckedKeys,
            notificationCheckedKeys,
        } = _ || getState().newDriverManager;
        const response = await fetchAdd({
            display_name: roleName,
            description: roleDescription,
            permission_ids: systemCheckedKeys.concat(driverCheckedKeys, supportCheckedKeys, customerCheckedKeys, vehiclesCheckedKeys, tripCheckedKeys, notificationCheckedKeys),
        });
        dispatch(refresh());
        dispatch(getData());
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const quickCreate = createAsyncThunk(
    'NewDriverManager/quickCreate_RoleManager',
    async (_, { getState, dispatch }) => {
        const { name } = _ || getState().NewDriverManager;
        const response = await fetchAdd({
            name,
        });
        dispatch(getData());
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);

export const update = createAsyncThunk(
    'NewDriverManager/update_RoleManager',
    async (_, { getState, dispatch }) => {
        clog('getState()', getState());
        const {
            id,
            roleName,
            roleDescription,
            systemCheckedKeys,
            driverCheckedKeys,
            supportCheckedKeys,
            customerCheckedKeys,
            vehiclesCheckedKeys,
            tripCheckedKeys,
            notificationCheckedKeys,
        } = _ || getState().newDriverManager;
        const response = await fetchUpdate({
            id,
            display_name: roleName,
            description: roleDescription,
            permission_ids: systemCheckedKeys.concat(driverCheckedKeys, supportCheckedKeys, customerCheckedKeys, vehiclesCheckedKeys, tripCheckedKeys, notificationCheckedKeys),
        });
        // Vi update cung anh huong hen cac item khac nen phai reload tat ca lai
        dispatch(refresh());
        dispatch(getData());
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const quickUpdate = createAsyncThunk(
    'NewDriverManager/quickUpdate_RoleManager',
    async (_, { getState }) => {
        const { id, name } = _ || getState().NewDriverManager;
        const response = await fetchUpdate({
            id,
            name,
        });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);

export const deleteItem = createAsyncThunk(
    'NewDriverManager/deleteItem_RoleManager',
    async (_, { getState, dispatch }) => {
        const { selectedRows } = getState().newDriverManager;
        const { id } = selectedRows[0];
        const response = await fetchDelete({ id });
        dispatch(refresh());
        dispatch(getData());
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);
export const deleteMulti = createAsyncThunk(
    'NewDriverManager/deleteMulti_RoleManager',
    async (_, { getState, dispatch }) => {
        const { selectedRows } = _ || getState().NewDriverManager;
        const response = await fetchDeleteMulti({
            ids: formatGetIDAndTitleBFSubmit(selectedRows),
        });
        dispatch(refresh());
        dispatch(getData());
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);

export const getDriverForms = createAsyncThunk(
    'NewDriverManager/getDriverForms',
    async (_) => {
        const { driver_id } = _;
        const response = await getDriverCurrentSubmitedForms({ driver_id });
        clog(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
    },
);

export const NewDriverManager = createSlice({
    name: 'NewDriverManager',
    initialState,
    reducers: {
        // list
        changeSelectedRows: (state, action) => {
            state.selectedRows = action.payload;
        },
        changeSearch: (state, action) => {
            state.search = action.payload;
        },
        changePage: (state, action) => {
            state.page = action.payload;
        },
        changeOrder: (state, action) => {
            state.order = action.payload;
        },
        changeSpinnerSearch: (state, action) => {
            state.spinnerSearch = action.payload;
        },
        addDynamicFilterItem: (state, action) => {
            state.page = 1;
            state.dynamicFilter = [...state.dynamicFilter, action.payload];
        },
        removeDynamicFilterItem: (state, action) => {
            const index = state.dynamicFilter.findIndex(
                (obj) => obj.id === action.payload,
            );
            if (index !== -1) {
                state.dynamicFilter.splice(index, 1);
            }
        },
        removeAllDynamicFilterItem: (state) => {
            state.dynamicFilter = [];
        },
        setDynamicFilterItem: (state, action) => {
            state.page = 1;
            state.dynamicFilter = action.payload;
        },
        refresh: (state) => {
            state.page = 1;
            state.total = 0;
            state.selectedRows = [];
        },
        // state form
        changeRoleName: (state, action) => {
            state.roleName = action.payload;
        },
        changeRoleDescription: (state, action) => {
            state.roleDescription = action.payload;
        },
        changeSystemAutoExpandParent: (state, action) => {
            state.systemAutoExpandParent = action.payload;
        },
        changeSystemCheckedKeys: (state, action) => {
            state.systemCheckedKeys = action.payload;
        },
        changeSystemExpandedKeys: (state, action) => {
            state.systemExpandedKeys = action.payload;
        },
        changeSystemSelectedKeys: (state, action) => {
            state.systemSelectedKeys = action.payload;
        },
        changeCustomerAutoExpandParent: (state, action) => {
            state.customerAutoExpandParent = action.payload;
        },
        changeCustomerCheckedKeys: (state, action) => {
            state.customerCheckedKeys = action.payload;
        },
        changeCustomerExpandedKeys: (state, action) => {
            state.customerExpandedKeys = action.payload;
        },
        changeCustomerSelectedKeys: (state, action) => {
            state.customerSelectedKeys = action.payload;
        },

        changeDriverAutoExpandParent: (state, action) => {
            state.driverAutoExpandParent = action.payload;
        },
        changeDriverCheckedKeys: (state, action) => {
            state.driverCheckedKeys = action.payload;
        },
        changeDriverExpandedKeys: (state, action) => {
            state.driverExpandedKeys = action.payload;
        },
        changeDriverSelectedKeys: (state, action) => {
            state.driverSelectedKeys = action.payload;
        },

        changeVehiclesAutoExpandParent: (state, action) => {
            state.vehiclesAutoExpandParent = action.payload;
        },
        changeVehiclesCheckedKeys: (state, action) => {
            state.vehiclesCheckedKeys = action.payload;
        },
        changeVehiclesExpandedKeys: (state, action) => {
            state.vehiclesExpandedKeys = action.payload;
        },
        changeVehiclesSelectedKeys: (state, action) => {
            state.vehiclesSelectedKeys = action.payload;
        },

        changeTripAutoExpandParent: (state, action) => {
            state.tripAutoExpandParent = action.payload;
        },
        changeTripCheckedKeys: (state, action) => {
            state.tripCheckedKeys = action.payload;
        },
        changeTripExpandedKeys: (state, action) => {
            state.tripExpandedKeys = action.payload;
        },
        changeTripSelectedKeys: (state, action) => {
            state.tripSelectedKeys = action.payload;
        },

        changeNotificationAutoExpandParent: (state, action) => {
            state.notificationAutoExpandParent = action.payload;
        },
        changeNotificationCheckedKeys: (state, action) => {
            state.notificationCheckedKeys = action.payload;
        },
        changeNotificationExpandedKeys: (state, action) => {
            state.notificationExpandedKeys = action.payload;
        },
        changeNotificationSelectedKeys: (state, action) => {
            state.notificationSelectedKeys = action.payload;
        },

        changeSupportAutoExpandParent: (state, action) => {
            state.supportAutoExpandParent = action.payload;
        },
        changeSupportCheckedKeys: (state, action) => {
            state.supportCheckedKeys = action.payload;
        },
        changeSupportExpandedKeys: (state, action) => {
            state.supportExpandedKeys = action.payload;
        },
        changeSupportSelectedKeys: (state, action) => {
            state.supportSelectedKeys = action.payload;
        },

        // action
        changeSpinnerCreate: (state, action) => {
            state.spinnerCreate = action.payload;
        },
        changeShowModalCreate: (state, action) => {
            state.showModalCreate = action.payload;
        },
        changeUpdateItem: (state, action) => {
            state.updateItem = action.payload;
        },
        initCreateWithoutShowModal: (state) => {
            handleInitCreate(state);
        },
        initCreate: (state) => {
            handleInitCreate(state);
            state.showModalCreate = true;
        },
        initUpdateWithoutShowModal: (state, action) => {
            handleInitUpdate(state, action);
        },
        initUpdate: (state, action) => {
            handleInitUpdate(state, action);
            state.showModalCreate = true;
        },
        initDuplicate: (state) => {
            state.id = null;
            state.title = '';
            state.spinnerCreate = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
                if (state.data.length === 0) {
                    state.spinnerSearch = true;
                }
            })
            .addCase(getData.fulfilled, (state, action) => {
                if (action.payload) {
                    // const formatedData = action.payload.data.map((item) => {
                    //   let cover = null;
                    //   // loop het tat ca medias de tim media co type la cover
                    //   for (let i = 0; i < item.medias.length; i++) {
                    //     if (item.medias[i].type === 'cover') {
                    //       cover = item.medias[i];
                    //       break;
                    //     }
                    //   }
                    //   item.cover = cover;
                    //   return item;
                    // });
                    state.data = action.payload.data;
                    state.total = action.payload.total;
                }
                state.spinnerSearch = false;
            })
            .addCase(getItemByID.pending, (state) => {
                state.spinnerCreate = true;
            })
            .addCase(getDriverForms.fulfilled, (state, action) => {
                // if (action.payload) {
                clog('action.payload', action.payload);
                state.driverForms[action.meta.arg.driver_id] = action.payload;
                // }
                state.spinnerCreate = false;
            })
            .addCase(getItemByID.fulfilled, (state, action) => {
                if (action.payload) {
                    clog('action.payload', action.payload);
                    handleInitUpdate(state, action);
                }
                state.spinnerCreate = false;
            })
            .addCase(create.pending, (state) => {
                state.spinnerCreate = true;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.spinnerCreate = false;
                if (action.payload) {
                    cleanForm(state);
                    state.showModalCreate = false;
                    showSuccess(tt('Tạo thành công'));
                }
            })
            .addCase(update.pending, (state) => {
                state.spinnerCreate = true;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.spinnerCreate = false;
                state.showModalCreate = false;
                if (action.payload) {
                    const index = state.data.findIndex(
                        (obj) => obj.id === action.payload.id,
                    );
                    if (index !== -1) {
                        state.data[index] = { ...state.data[index], ...action.payload };
                        showSuccess(tt('Cập nhật thành công'));
                        cleanForm(state);
                    }
                }
            })
            .addCase(deleteMulti.pending, (state) => {
                state.spinnerSearch = true;
            })
            .addCase(deleteMulti.fulfilled, (state, action) => {
                state.spinnerSearch = false;
                if (action.payload !== null && action.payload.length === 0) {
                    state.selectedRows = [];
                    showSuccess(tt('Xoá thành công'));
                }
            })
            .addCase(deleteItem.pending, (state) => {
                state.spinnerCreate = true;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.spinnerCreate = false;
                if (action.payload) {
                    showSuccess(tt('Xoá thành công'));
                }
            });
    },
});

export const {
    changeSelectedRows,
    changeSearch,
    changePage,
    changeSpinnerSearch,
    addDynamicFilterItem,
    setDynamicFilterItem,
    removeDynamicFilterItem,
    removeAllDynamicFilterItem,
    refresh,
    changeRoleDescription,
    changeRoleName,
    changeUpdateItem,
    changeShowModalCreate,
    initUpdate,
    initCreate,
    changeSpinnerCreate,
    initCreateWithoutShowModal,
    initUpdateWithoutShowModal,
    initDuplicate,
    changeOrder,
    changeSystemAutoExpandParent,
    changeSystemCheckedKeys,
    changeSystemExpandedKeys,
    changeSystemSelectedKeys,
    changeCustomerAutoExpandParent,
    changeCustomerCheckedKeys,
    changeCustomerExpandedKeys,
    changeCustomerSelectedKeys,
    changeDriverAutoExpandParent,
    changeDriverCheckedKeys,
    changeDriverExpandedKeys,
    changeDriverSelectedKeys,
    changeVehiclesAutoExpandParent,
    changeVehiclesCheckedKeys,
    changeVehiclesExpandedKeys,
    changeVehiclesSelectedKeys,
    changeTripAutoExpandParent,
    changeTripCheckedKeys,
    changeTripExpandedKeys,
    changeTripSelectedKeys,
    changeNotificationAutoExpandParent,
    changeNotificationCheckedKeys,
    changeNotificationExpandedKeys,
    changeNotificationSelectedKeys,
    changeSupportAutoExpandParent,
    changeSupportCheckedKeys,
    changeSupportExpandedKeys,
    changeSupportSelectedKeys,
} = NewDriverManager.actions;
export const selectedRows = (state) => state.newDriverManager.selectedRows;
export const search = (state) => state.newDriverManager.search;
export const page = (state) => state.newDriverManager.page;
export const limit = (state) => state.newDriverManager.limit;
export const order = (state) => state.newDriverManager.order;
export const data = (state) => state.newDriverManager.data;
export const total = (state) => state.newDriverManager.total;
export const spinnerSearch = (state) => state.newDriverManager.spinnerSearch;
// FILTER
export const dynamicFilter = (state) => state.newDriverManager.dynamicFilter;
// CREATE
export const showModalCreate = (state) => state.newDriverManager.showModalCreate;
export const id = (state) => state.newDriverManager.id;
export const updateItem = (state) => state.newDriverManager.updateItem;
export const roleName = (state) => state.newDriverManager.roleName;
export const roleDescription = (state) => state.newDriverManager.roleDescription;

export const systemExpandedKeys = (state) => state.newDriverManager.systemExpandedKeys;
export const systemAutoExpandParent = (state) => state.newDriverManager.systemAutoExpandParent;
export const systemCheckedKeys = (state) => state.newDriverManager.systemCheckedKeys;
export const systemSelectedKeys = (state) => state.newDriverManager.systemSelectedKeys;

export const driverExpandedKeys = (state) => state.newDriverManager.driverExpandedKeys;
export const driverAutoExpandParent = (state) => state.newDriverManager.driverAutoExpandParent;
export const driverCheckedKeys = (state) => state.newDriverManager.driverCheckedKeys;
export const driverSelectedKeys = (state) => state.newDriverManager.driverSelectedKeys;

export const supportExpandedKeys = (state) => state.newDriverManager.supportExpandedKeys;
export const supportAutoExpandParent = (state) => state.newDriverManager.supportAutoExpandParent;
export const supportCheckedKeys = (state) => state.newDriverManager.supportCheckedKeys;
export const supportSelectedKeys = (state) => state.newDriverManager.supportSelectedKeys;

export const customerExpandedKeys = (state) => state.newDriverManager.customerExpandedKeys;
export const customerAutoExpandParent = (state) => state.newDriverManager.customerAutoExpandParent;
export const customerCheckedKeys = (state) => state.newDriverManager.customerCheckedKeys;
export const customerSelectedKeys = (state) => state.newDriverManager.customerSelectedKeys;

export const vehiclesExpandedKeys = (state) => state.newDriverManager.vehiclesExpandedKeys;
export const vehiclesAutoExpandParent = (state) => state.newDriverManager.vehiclesAutoExpandParent;
export const vehiclesCheckedKeys = (state) => state.newDriverManager.vehiclesCheckedKeys;
export const vehiclesSelectedKeys = (state) => state.newDriverManager.vehiclesSelectedKeys;

export const tripExpandedKeys = (state) => state.newDriverManager.tripExpandedKeys;
export const tripAutoExpandParent = (state) => state.newDriverManager.tripAutoExpandParent;
export const tripCheckedKeys = (state) => state.newDriverManager.tripCheckedKeys;
export const tripSelectedKeys = (state) => state.newDriverManager.tripSelectedKeys;

export const notificationExpandedKeys = (state) => state.newDriverManager.notificationExpandedKeys;
export const notificationAutoExpandParent = (state) => state.newDriverManager.notificationAutoExpandParent;
export const notificationCheckedKeys = (state) => state.newDriverManager.notificationCheckedKeys;
export const notificationSelectedKeys = (state) => state.newDriverManager.notificationSelectedKeys;

export const spinnerCreate = (state) => state.newDriverManager.spinnerCreate;
export default NewDriverManager.reducer;

export const driverFormsSelector = (state) => state.newDriverManager.driverForms;
