/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-shadow */
/* eslint-disable max-len */

import { Input, InputNumber, Radio, Select, Spin, Switch, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { clog, tt } from "../../../utils";
import { optionTypes, spinnerCreate } from "../../../store/SupportDriver";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function Create(props) {
    const { data, onChangeData } = props;
    const _spinner = useSelector(spinnerCreate);
    const _optionTypes = useSelector(optionTypes);
    const [options, setOptions] = useState(_optionTypes);
    const [_id, setId] = useState(data._id);
    const [_name, setName] = useState(data._name);
    const [_value, setValue] = useState(data._value);
    const [_type, setType] = useState(data._type);
    const [_status, setStatus] = useState(data._status);
    const [_data, setData] = useState(data._data);
    const [errorVersion, setErrorVersion] = useState("");

    const onChangeType = (value) => {
        // setOptions((prevData) => ({ ...prevData, version: newValue }));
        setValue("");
        setType(value);
        setName(mapTypes[value]);
    };

    useEffect(() => {
        setOptions(_optionTypes);
    }, [_optionTypes]);

    const handleOnChangeValue = (e) => setValue(e.target.value);

    const handleOnChangeValueEditor = (value) => {
        setValue(value);
    };

    const handleOnChangeVersion = (e) => {
        const newValue = e.target.value;
        setData((prevData) => ({ ...prevData, version: newValue }));
        let error = false;
        if (e.target.value === "") {
            error = true;
            setErrorVersion("Vui lòng nhập version");
        } else {
            const regex = /^\d+(\.\d+){0,1}$/;
            if (!regex.test(newValue)) {
                error = true;
                setErrorVersion("Version không hợp lệ");
            } else {
                error = false;
                setErrorVersion("");
            }
        }
        props.onChangeError(error);

        // Kiểm tra xem giá trị nhập vào có hợp lệ không, ví dụ: x.x.x
    };

    const handleRender = () => {
        switch (_type) {
            case 1:
                return (
                    <>
                        <div className="md:w-1/6" style={{ width: "120px" }}>
                            <label
                                style={{
                                    width: "120px",
                                    fontSize: "16px",
                                }}
                                htmlFor="so_dien_thoai"
                            >
                                <strong>{"Số điện thoại"}</strong>
                            </label>
                        </div>
                        <div className="md:w-5/6">
                            <Input
                                className="p-2 w-full"
                                value={_value}
                                onChange={handleOnChangeValue}
                            />
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="md:w-1/6" style={{ width: "100px" }}>
                            <label
                                style={{
                                    width: "100px",
                                    fontSize: "16px",
                                }}
                                htmlFor="email"
                            >
                                <strong>{"Email"}</strong>
                            </label>
                        </div>
                        <div className="md:w-5/6">
                            <Input
                                className="p-2 w-full"
                                value={_value}
                                onChange={handleOnChangeValue}
                            />
                        </div>
                    </>
                );
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                return (
                    <>
                        <div className="md:w-1/6" style={{ width: "100px" }}>
                            <label
                                style={{
                                    width: "100px",
                                    fontSize: "16px",
                                }}
                                htmlFor="vai_tro"
                            >
                                <strong>{"Giá trị"}</strong>
                            </label>
                        </div>
                        <div className="md:w-5/6">
                            <ReactQuill
                                theme={"snow"} // pass false to use minimal theme
                                className="h-[300px]"
                                value={_value}
                                onChange={handleOnChangeValueEditor}
                            />
                        </div>
                    </>
                );
            case 8:
                return (
                    <>
                        <div className="md:w-1/6" style={{ width: "100px" }}>
                            <label
                                style={{
                                    width: "100px",
                                    fontSize: "16px",
                                }}
                                htmlFor="vai_tro"
                            >
                                <strong>{"Version"}</strong>
                            </label>
                        </div>
                        <div className="md:w-5/6">
                            <Input
                                className="p-2 w-full"
                                value={_data?.version}
                                onChange={handleOnChangeVersion}
                                // pattern="^\d+(\.\d+){0,2}$"
                            />
                            {errorVersion && (
                                <span className="text-red-500">
                                    {errorVersion}
                                </span>
                            )}
                        </div>
                        <div className="md:w-1/6" style={{ width: "100px" }}>
                            <label
                                style={{
                                    width: "100px",
                                    fontSize: "16px",
                                }}
                                htmlFor="vai_tro"
                            >
                                <strong>{"Giá trị"}</strong>
                            </label>
                        </div>
                        <div className="md:w-5/6">
                            <ReactQuill
                                theme={"snow"} // pass false to use minimal theme
                                className="h-[300px]"
                                value={_value}
                                onChange={handleOnChangeValueEditor}
                            />
                        </div>
                    </>
                );
            default:
                return <div></div>;
        }
    };

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleOnChangeStatus = (checked) => {
        setStatus(checked ? 1 : 0);
    };

    useEffect(() => {
        if (data) {
            const { _id, _name, _value, _type, _status, _data } = data;
            setId(_id);
            setName(_name);
            setValue(_value);
            setType(_type);
            setStatus(_status);
            setData(_data);
        }
    }, [data]);

    const dataToSend = {
        _name,
        _value,
        _type,
        _status,
        _data,
        errorVersion,
    };

    useEffect(() => {
        // for control
        handleOnChangeData(dataToSend);
    }, [_id, _name, _value, _type, _status, _data]);

    const handleOnChangeData = (dataToSend) => {
        onChangeData(dataToSend);
    };

    const mapTypes = {
        1: "Tổng đài",
        2: "Email hỗ trợ",
        3: "Thông tin về cudidi",
        4: "Thông tin hủy tài khoản của khách hàng",
        5: "Thông tin hủy tài khoản của tài xế",
        6: "Thông tin chính sách của khách hàng",
        7: "Thông tin điều khoản của khách hàng",
        8: "Thông tin chính sách của tài xế",
    };

    return (
        <div>
            <Spin tip={"Đang tải..."} size={"large"} spinning={_spinner}>
                <div className="p-6">
                    {/*INPUTS*/}
                    {/* <div className="mb-4">
                        <div className="md:w-1/6" style={{ width: "150px" }}>
                            <label
                                style={{
                                    width: "150px",
                                    fontSize: "16px",
                                }}
                                htmlFor="vai_tro"
                            >
                                <strong>{tt("Tên cấu hình *")}</strong>
                            </label>
                        </div>
                        <div className="md:w-5/6">
                            <Input
                                id="vai_tro"
                                className="w-full p-2 rounded"
                                maxLength={50}
                                value={_name}
                                onChange={handleChangeName}
                            />
                        </div>
                    </div> */}
                    <div className="mb-4">
                        <div className="md:w-1/6" style={{ width: "100px" }}>
                            <label
                                style={{
                                    width: "100px",
                                    fontSize: "16px",
                                }}
                                htmlFor="vai_tro"
                            >
                                <strong>{tt("Loại hiển thị")}</strong>
                            </label>
                        </div>
                        <div className="md:w-5/6">
                            <Select
                                className="w-[50%] h-[40px] rounded"
                                showSearch
                                placeholder={tt("Loại hiển thị")}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? "").includes(input)
                                }
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? "")
                                        .toLowerCase()
                                        .localeCompare(
                                            (optionB?.label ?? "").toLowerCase()
                                        )
                                }
                                value={{ value: _type, label: mapTypes[_type] }}
                                options={options}
                                onChange={onChangeType}
                            />
                        </div>
                    </div>
                    {/* <div className="mb-4">
                        <div className="md:w-1/6" style={{ width: "100px" }}>
                            <label
                                style={{
                                    width: "100px",
                                    fontSize: "16px",
                                }}
                                htmlFor="trang_thai"
                            >
                                <strong>{tt("Trạng thái")}</strong>
                            </label>
                        </div>
                        <div className="md:w-5/6">
                            <Switch
                                checkedChildren={tt("Hoạt động")}
                                unCheckedChildren={tt("Ngưng hoạt động")}
                                checked={_status === 1 ? true : false}
                                value={_status === 1 ? true : false}
                                onChange={handleOnChangeStatus}
                            />
                        </div>
                    </div> */}
                    <div className="mb-4">{handleRender()}</div>
                </div>
            </Spin>
        </div>
    );
}

export default Create;
