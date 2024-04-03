import {Button, Form, FormProps, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useFormState} from 'react-dom';
import {bookRoom, registerUser} from "@/lib/actions";

export default function BookingForm({room, checkInDate, checkOutDate}: { room: Room, checkInDate: string, checkOutDate: string }) {

    const onFinish: FormProps["onFinish"] = (values) => {
        // registerUser(values.firstName, values.lastName, values.idType, values.address)
        let formRes = JSON.stringify({
            idType: values.idType,
            name: values.firstName + " " + values.lastName,
            address: {
                city: values.city,
                country: values.country,
                postalCode: values.postalCode,
                province: values.province,
                street: values.street
            }
        })



        registerUser(formRes).then((res) =>  {
            let booking: Booking = {
                roomNumber: room.roomNumber,
                customerId: res,
                hotelId: room.hotelId,
                bookingStatus: "booked",
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                damageFee: 0
            }
            console.log(booking)
            bookRoom(booking)
        })
    }


    return (
        <div className={'overflow: auto'}>
            <Form onFinish={onFinish}>
                {/*Name inputs*/}
                <Form.Item<string>
                    label={'First Name'}
                    name={'firstName'}>
                    <Input/>
                </Form.Item>
                <Form.Item<string>
                    label={'Last Name'}
                    name={'lastName'}>
                    <Input/>
                </Form.Item>
                <Form.Item<string>
                    label={'id type'}
                    name={'idType'}>
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
        </div>
    )
}