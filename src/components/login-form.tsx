'use client';
import {Button, Form, FormProps, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {login} from "@/lib/actions";
import {redirect} from "next/navigation";
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const router = useRouter()

    type UserLogin = {
        hotelId?: string;
        sin?: string;
    }

    const onFinish: FormProps<UserLogin>["onFinish"] = (values) => {
        console.log(values)
        login(values.hotelId!, values.sin!).then((res) => res ? router.push(`admin/${values.hotelId}`) : alert("login failed"))
    }

    return (
        <Form onFinish={onFinish}>
            <Form.Item<UserLogin>
                label={'Username (hotel id)'}
                name={'hotelId'}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />}/>
            </Form.Item>
            <Form.Item<UserLogin>
                label={'Password (sin/ssn)'}
                name={'sin'}
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