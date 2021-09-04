import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import {Header} from '../components/Header';
import {Task, TasksList} from '../components/TasksList';
import {TodoInput} from '../components/TodoInput';

export interface EditTaskArgs {
    id: number,
    newTitle: string
}

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function handleAddTask(newTaskTitle: string) {
        const findTask = tasks.find(task => task.title === newTaskTitle)

        if (findTask) {
            return Alert.alert(
                'Task já cadastrada',
                'Você não pode cadastrar uma task com o mesmo nome.'
            )
        }

        setTasks(oldTasks => [...oldTasks, {
            id: new Date().getTime(),
            title: newTaskTitle,
            done: false,
            edit: false,
        }])
    }

    function handleToggleTaskDone(id: number) {
        setTasks(tasks.map(item => (
            item.id === id ? {...item, done: !item.done} : item
        )))
    }

    function handleRemoveTask(id: number) {
        Alert.alert(
            'Remove item',
            'Tem certeza que você deseja remover esse item?',
            [
                {
                    style: "cancel",
                    text: 'Não'
                },
                {
                    style: "destructive",
                    text: 'Sim',
                    onPress: () => {
                        setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id))
                    }
                }
            ]
        )
    }

    function handleEditTask({id, newTitle}: EditTaskArgs) {
        setTasks(tasks.map(item => (
            item.id === id
                ? {
                    ...item,
                    title: newTitle
                }
                : item
        )))
    }

    return (
        <View style={styles.container}>
            <Header tasksCounter={tasks.length}/>

            <TodoInput addTask={handleAddTask}/>

            <TasksList
                tasks={tasks}
                toggleTaskDone={handleToggleTaskDone}
                removeTask={handleRemoveTask}
                editTask={handleEditTask}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB'
    }
})
