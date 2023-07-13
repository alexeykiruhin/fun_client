import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Channel } from "diagnostics_channel";
import { socket } from "../socket";
import ListRooms from "../components/listRooms/ListRooms";
import { useDispatch } from "react-redux";
import { setList } from "./slices/listRooms";
import { ListRoomsState } from "./slices/listRooms";

// ...


const URL = "http://127.0.0.1:5000";

interface Home {
    users: number
}

interface ListRooms {
    rooms: [{
        id: number,
        name: string
        // length: number
    }]
}

export const api = createApi({
    reducerPath: "api",
    tagTypes: ['Home'],
    baseQuery: fetchBaseQuery({
        baseUrl: URL
    }),
    endpoints: (builder) => ({
        getHome: builder.query<Home, void>({
            query: () => `/`,
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
                    socket.on('create', (rooms: ListRooms) => {
                        console.log('Received event:', rooms);
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
        get_stage_1: builder.query<ListRooms, void>({
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
                    socket.on('create', (rooms: ListRooms) => {
                        console.log('Received event:', rooms);
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
        })
    }),
});

export const { useGetHomeQuery, useGetListRoomsQuery, useGetRoomsQuery } = api;