import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import { NextPage } from "next";
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Session from "../../model/session";
import styles from '../../styles/Room.module.css';
import layout from '../../styles/Layout.module.css';
import Image from 'next/image';
import arek from '../../public/images/arek.jpeg';
import dawid from '../../public/images/dawid.jpeg';
import kacper from '../../public/images/kacper.jpeg';
import kuba from '../../public/images/kuba.jpeg';
import maks from '../../public/images/maks.jpeg';
import olek from '../../public/images/olek.jpeg';
import piotrek from '../../public/images/piotrek.jpeg';
import wombo from '../../public/images/wombo.gif';

const SEQUENCE = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100];
const USER_DATA = new Map();

USER_DATA.set('a.filipczak@cksource.com', { name: 'Arek', photo: arek });
USER_DATA.set('d.urbanski@cksource.com', { name: 'Dawid', photo: dawid });
USER_DATA.set('k.tomporowski@cksource.com', { name: 'Kacper', photo: kacper });
USER_DATA.set('j.niegowski@cksource.com', { name: 'Kuba', photo: kuba });
USER_DATA.set('m.barnas@cksource.com', { name: 'Maks', photo: maks });
USER_DATA.set('a.nowodzinski@cksource.com', { name: 'Olek', photo: olek });
USER_DATA.set('p.koszulinski@cksource.com', { name: 'PK', photo: piotrek, animated: wombo });
USER_DATA.set('mail.urbanski@gmail.com', { name: 'Priv', photo: piotrek, animated: wombo });

const Room: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [sessions, setSessions] = useState<Array<Session>>([]);
    const [stage, setStage] = useState<'voting'|'countdown'|'results'>('voting');
    const { user, isLoading } = useUser();

    useEffect(() => {
        const addUserToSession = async () => {
            try {
                await axios.post('/api/add-me-to-room-session', { room_id: id });
            } catch (error) {
                console.error(error);
            }
        };

        const getRoomSessions = async () => {
            try {
                const { data } = await axios.post('/api/room-sessions', { room_id: id });
                setSessions(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (id && user) {
            addUserToSession();
            getRoomSessions();
        }
    }, [id, user]);

    useEffect(() => {
        const removeUserFromSession = async () => {
            await axios.post('/api/remove-me-from-room-session', { room_id: id });
        }

        if (process.browser) {
            window.onbeforeunload = () => {
                removeUserFromSession();
            }
        }

        router.events.on('routeChangeStart', removeUserFromSession);
    }, [id, router]);

    console.log(sessions);

    return (
        <div>
            <Head>
                <title>Planning poker! Room: {id}</title>
                <meta name="description" content="Poor man's planning poker." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={layout.page}>
                <div className={layout.header}>
                    <div>
                        Header
                    </div>
                    <div>
                        <Link href="/">Home</Link>
                    </div>
                </div>
                <div className={layout.content}>
                    <div className={styles.table}>
                        <div className={styles.users}>
                            {sessions.map(session => USER_DATA.get(session.User.email) && (
                                <>
                                    <div key={session.ID} className={styles.user}>
                                        <div className={styles.user__card}>
                                            <div className={styles['user__card-inner']}
                                                 style={stage === 'results' ? { transform: 'rotateY(180deg)'} : {}}>
                                                <div className={styles['user__card-front']}>
                                                    
                                                </div>
                                                <div className={styles['user__card-back']}>
                                                    100
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.user__photo}>
                                            <Image 
                                                src={USER_DATA.get(session.User.email).photo}
                                                alt={USER_DATA.get(session.User.email).name}
                                                width={120}
                                                height={120}
                                            />
                                            <div className={styles.user__meta}>
                                                <div className={styles.user__name}>
                                                    {USER_DATA.get(session.User.email).name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                        <div className={styles.cards}>
                            {SEQUENCE.map(number => (
                                <button key={number} className={styles.card} onClick={() => setStage('results')}>{number}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withPageAuthRequired(Room);