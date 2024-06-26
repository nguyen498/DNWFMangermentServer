/* eslint-disable no-shadow */
import React, { useContext, useEffect } from "react";
import { Breadcrumb, Button, Dropdown, Form, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { clog, tt } from "../../utils";
import {
    changeSpinnerCreate,
    create,
    deleteMulti,
    getItemByID,
    id,
    initDuplicate,
    update,
    updateItem,
    changeContent,
    changeQuestionId,
    questionId,
    content,
} from "../../store/ConfigAnswer";
import Create from "./FormCreate/Create";
import { getBreadcrumb } from "../../utils/function";
import { requireAdmin } from "../../store";
import { throttleOnPressAction } from "../../hook/throttlePressAcion";
import { PermissionsContext } from "../../store/Permissions";
import { PERMISSIONS_MAP } from "../../constants";

const { confirm } = Modal;

function CustomForm() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const _updateItem = useSelector(updateItem);

    const _id = useSelector(id);
    const _questionId = useSelector(questionId);
    const _content = useSelector(content);

    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const myPermissions = useContext(PermissionsContext).permissions;

    const showModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        clog("searchParams id", searchParams.get("id"));
        const idParam = searchParams.get("id");
        if (idParam && _id === null) {
            dispatch(getItemByID({ id: idParam }));
        }
    }, []);

    const handleOnChangeError = (error) => {
        clog("error", error);
        setError(error);
    };

    const handleOnChildChange = (data) => {
        clog("dataToSend", data);
        const { _content, _questionId } = data;
        dispatch(changeContent(_content));
        dispatch(changeQuestionId(_questionId));
    };

    const dataToForm = () => ({
        _id,
        _content,
        _questionId,
    });

    const submitSave = () => {
        form.validateFields()
            .then((values) => {
                clog("values", values);
                if (_id) {
                    // update
                    dispatch(update()).then(({ payload }) => {
                        if (payload) {
                            navigate("/cms/configAnswer?view_type=list");
                        }
                    });
                } else {
                    // new
                    dispatch(create()).then(({ payload }) => {
                        if (payload) {
                            navigate("/cms/configAnswer?view_type=list");
                        }
                    });
                }
            })
            .catch((errorInfo) => {
                clog("errorInfo", errorInfo);
            });
    };

    const handleOnPressSave = () => {
        clog("Cập nhật");
        throttleOnPressAction(submitSave);
    };

    const handleOnPressCancel = () => {
        navigate("/cms/configAnswer?view_type=list");
    };

    const handleOnPressCreate = () => {
        showModal();
    };

    const items = [
        {
            label: tt("Nhân bản"),
            key: "0",
        },
        // can("championshipvouchers", ["championshipvouchers-voucher-delete"], _permission) && {
        //     label: tt("Xoá"),
        //     key: "1",
        //     //   disabled: _updateItem?.status !== 1,
        // },
    ];

    const submitDelete = () => {
        requireAdmin().then(() => {
            dispatch(changeSpinnerCreate(true));
            dispatch(deleteMulti({ selectedRows: [_updateItem] })).then(
                ({ payload }) => {
                    dispatch(changeSpinnerCreate(false));
                    if (payload) {
                        navigate("/cms/configAnswer?view_type=list");
                    }
                }
            );
        });
    };

    const handleMenuClick = (e) => {
        switch (e.key) {
            case "0":
                dispatch(initDuplicate());
                navigate("/cms/configAnswer?view_type=form");
                break;
            case "1":
                confirm({
                    title: tt("Bạn có chắc chắn muốn xoá?"),
                    icon: <ExclamationCircleFilled />,
                    content: `${tt("Xoá")} ${_updateItem?.name}`,
                    onOk() {
                        throttleOnPressAction(submitDelete);
                    },
                    onCancel() {},
                });
                break;
            default:
                break;
        }
    };

    const breadcrumbNameMap = {
        "?view_type=list": tt("Danh sách câu trả lời"),
        "?view_type=form": tt("Mới"),
        "?view_type=form&id={id}": _updateItem?.name,
    };
    const extraBreadcrumbItems = getBreadcrumb(breadcrumbNameMap);
    const breadcrumbItems = [
        {
            title: (
                <Link to="/cms/configAnswer">
                    {tt("Danh sách câu trả lời")}
                </Link>
            ),
            key: "config_infor_home",
        },
    ].concat(extraBreadcrumbItems);

    const setTypeConfirm = () =>
        searchParams.get("id") === null ? "create" : "update";

    return (
        <div
            className="custom-container"
            style={{ paddingTop: "10px", paddingBottom: 0 }}
        >
            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <div style={{ height: "32px" }} className="mb-1.5">
                    <div className="ant-breadcrumb_custom_fontsize">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        {myPermissions[PERMISSIONS_MAP["update-answer"]] && (
                            <Button
                                type="primary"
                                style={{ marginRight: "8px" }}
                                className="mb-1.5"
                                onClick={handleOnPressSave}
                            >
                                {tt(_id ? "Cập nhật" : "Lưu")}
                            </Button>
                        )}

                        <Button
                            type="text"
                            style={{ marginRight: "8px" }}
                            className="mb-1.5"
                            onClick={handleOnPressCancel}
                        >
                            {tt("Quay lại")}
                        </Button>
                    </div>
                    {_id && (
                        <div>
                            {/* <Dropdown
                                menu={{
                                    items,
                                    onClick: handleMenuClick,
                                }}
                                trigger={["click"]}
                            >
                                <Button
                                    icon={<i className="fa fa-cog" />}
                                    onClick={(e) => e.preventDefault()}
                                    className="custom-button-ant-span bp375:float-right mb-1.5"
                                >
                                    {tt("Tác vụ")}
                                </Button>
                            </Dropdown> */}
                        </div>
                    )}
                </div>
            </div>

            <div>
                <div className="bg-stripes-purple">
                    <div
                        className="custom-form-sheet-sm"
                        style={{ maxWidth: "1000px", minHeight: "unset" }}
                    >
                        <Create
                            data={dataToForm()}
                            onChangeData={handleOnChildChange}
                            onChangeError={handleOnChangeError}
                            form={form}
                        />
                    </div>
                </div>
            </div>

            {/* <ModalInforPrize
                data={dataToForm()}
                isModalOpen={isModalOpen}
                handleOk={handleOk(setTypeConfirm())}
                handleCancel={handleCancel}
            /> */}
        </div>
    );
}

export default CustomForm;
