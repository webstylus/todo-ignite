import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ItemWrapper} from './ItemWrapper';
import {EditTaskArgs} from "../pages/Home";
import {TaskItem} from "./TaskItem";

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TasksListProps {
    tasks: Task[];
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({id, newTitle}: EditTaskArgs) => void;
}

export function TasksList({tasks, toggleTaskDone, removeTask, editTask}: TasksListProps) {

    return (
        <FlatList
            style={{marginTop: 32}}
            data={tasks}
            keyExtractor={item => String(item.id)}
            contentContainerStyle={{paddingBottom: 24}}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
                return (
                    <ItemWrapper index={index}>
                        <TaskItem task={item}
                                  toggleTaskDone={toggleTaskDone}
                                  removeTask={removeTask}
                                  editTask={editTask}/>
                    </ItemWrapper>
                )
            }}

        />
    )
}

const styles = StyleSheet.create({})
