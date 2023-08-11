import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { socket } from "../socket";

// ...


const URL = "http://127.0.0.1:5000";

interface LoginOK {
    'user_obj': object,
    'isAuth': boolean,
    'access_token': string,
    'refresh_token': string,
    'stage': string
}

interface Home {
    users: number
}

export interface ListRooms {
    rooms: [{
        id: number,
        name: string
        // length: number
    }]
}

export interface LoginData {
    username: string,
    password: string
}

export interface errLogin {
    data: {
        messageError: string
    }
}

export interface GameData {
    id: string
}


export const api = createApi({
    reducerPath: "api",
    tagTypes: ['Home'],
    baseQuery: fetchBaseQuery({
        baseUrl: URL,
        prepareHeaders: (headers) => {
            // Добавляем хедер авторизации в настройки инстанса
            const access_token = localStorage.getItem('access_token');
            if (access_token) {
                headers.set('Authorization', `Bearer ${access_token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginOK | string | errLogin, LoginData>({
            query: (loginData) => ({
                url: "/api/login",
                method: "POST",
                body: loginData,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: LoginOK): string => {
                console.log('transform', response);
                // Получаю токен и записываю в localStorage
                localStorage.setItem('access_token', response.access_token);
                // changeVisible(response.stage)
                // Мутируйте ответ здесь и верните новый объект

                return response.stage
            },
            transformErrorResponse: (response) => {
                console.log('ERROSDDSD', response);
                return response
            },
        }),
        getHome: builder.query<Home, void>({
            query: () => `/api/game`,
        }),
        getListRooms: builder.query<ListRooms, void>({
            query: () => `/list_rooms`,
        }),
        getRooms: builder.query<ListRooms, void>({
            query: () => `/`,
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                try {
                    // wait for the initial query to resolve before proceeding
                    await cacheDataLoaded

                    // Socket
                    socket.connect();
                    console.log('connect');
                    socket.emit('get_list_rooms');
                    socket.on('get_list_rooms', (rooms: ListRooms) => {
                        console.log('Get_list_rooms:', rooms.rooms);
                        // Обновите состояние с помощью updateCachedData
                        updateCachedData(draft => {
                            draft.rooms = rooms.rooms;
                            console.log(draft.rooms);
                        });
                    });

                    await cacheEntryRemoved;
                    socket.off('connect');
                } catch {
                    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                    // in which case `cacheDataLoaded` will throw
                }
            },
        }),
        createRoom: builder.query<ListRooms, void>({
            query: () => `/`,
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                try {
                    // wait for the initial query to resolve before proceeding
                    await cacheDataLoaded
                    // Socket
                    // socket.connect();
                    socket.emit('create', arg)
                    socket.on('create', (rooms: ListRooms) => {
                        console.log('create', rooms);
                        debugger
                        updateCachedData(() => {
                            console.log('data', rooms);
                            return rooms
                        });
                    });

                    await cacheEntryRemoved;
                    socket.off('connect');
                } catch {
                    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                    // in which case `cacheDataLoaded` will throw
                }
            },
        }),
        connectRoom: builder.query<GameData, string>({
            query: () => `/`,
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                try {
                    // wait for the initial query to resolve before proceeding
                    await cacheDataLoaded
                    // Socket
                    // socket.connect();
                    socket.emit('connect_room', arg)
                    // socket.on('create', (rooms: ListRooms) => {
                    //     console.log('create', rooms);
                    //     debugger
                    //     updateCachedData(() => {
                    //         console.log('data', rooms);
                    //         return rooms
                    //     });
                    // });

                    await cacheEntryRemoved;
                    // socket.off('connect');
                } catch {
                    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                    // in which case `cacheDataLoaded` will throw
                }
            },
        }),
    }),
});

export const { useLoginMutation, useGetHomeQuery, useGetListRoomsQuery, useGetRoomsQuery, useCreateRoomQuery, useConnectRoomQuery } = api;