'use client';
import {Button, Form, FormProps, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";


export default function BookingForm({room}:{room: Room}) {

    const onFinish: FormProps["onFinish"] = (values) => {

    }


    return (
        <Form onFinish={onFinish}>
            {/*Name inputs*/}
            <Form.Item
                label={'First Name'}
                name={'firstName'}>
                <Input/>
            </Form.Item>
            <Form.Item
                label={'Last Name'}
                name={'lastName'}>
                <Input/>
            </Form.Item>

            {/*Address inputs*/}
            <Form.Item<Address> label={'Street'} name={'street'}>
                <Input/>
            </Form.Item>

            <Form.Item<Address> label={'City'} name={'city'}>
                <Input/>
            </Form.Item>

            <Form.Item<Address> label={'Province'} name={'province'}>
                <Input/>
            </Form.Item>
            <Form.Item<Address> label={'Postal code'} name={'postalCode'}>
                <Input/>
            </Form.Item>
            <Form.Item<Address> label={'Country'} name={'country'}>
                <Input/>
            </Form.Item>
            <Form.Item>
                <Button type={'primary'} htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}