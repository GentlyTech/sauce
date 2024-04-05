'use client';
import {Button, Form, FormProps, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {login} from "@/lib/actions";
import { useRouter } from 'next/navigation'

export default function AuthForm() {
    const router = useRouter()

    const onFinish: FormProps<AuthFormFields>["onFinish"] = (values) => {
        console.log(values)
        login(values.username!, values.password!).then((res) => res ? router.push(`admin/${values.username}`) : alert("login failed"))
    }

    return (
        <Form onFinish={onFinish}>
            <Form.Item<AuthFormFields>
                label={'Username (hotel id)'}
                name={'username'}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />}/>
            </Form.Item>
            <Form.Item<AuthFormFields>
                label={'Password (sin/ssn)'}
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