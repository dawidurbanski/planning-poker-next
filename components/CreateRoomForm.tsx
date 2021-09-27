import { withPageAuthRequired, UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

function CreateRoomForm({ user }: { user: UserProfile }) {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<{
        userName: string;
        roomName: string;
    }>();

    const onSubmit = async ({ roomName }: { roomName: string }) => {
        const { data } = await axios.post('/api/create-room', {
            name: roomName
        });

        router.push(`room/${data.key}`);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {user && <h2>Hi {user.name}, create a new poker room</h2>}
            <label htmlFor="roomName">Poker room name</label><br />
            <input id="roomName" {...register('roomName', { required: true, maxLength: 30 })} /><br />
            {errors.roomName && errors.roomName.type === "required" && <span>This is required</span>}<br />
            <input type="submit" />
        </form>
    )
}

export default withPageAuthRequired(CreateRoomForm);