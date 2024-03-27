'use client';
import {Button, Form, FormProps, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

export default function LoginForm() {

    type UserLogin = {
        username?: string;
        password?: string;
    }

    const onFinish: FormProps<UserLogin>["onFinish"] = (values) => {
        console.log(values)
    }

    return (
        <Form onFinish={onFinish}>
            <Form.Item<UserLogin>
                label={'Username'}
                name={'username'}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />}/>
            </Form.Item>
            <Form.Item<UserLogin>
                label={'Password'}
                name={'password'}
            >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}/>
            </Form.Item>
            <Form.Item>
                <Button type={'primary'} htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}