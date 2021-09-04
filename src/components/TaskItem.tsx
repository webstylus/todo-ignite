import React, {useEffect, useRef, useState} from 'react';

import {EditTaskArgs} from "../pages/Home";
import {Task} from "./TasksList";
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';

import Icon from "react-native-vector-icons/Feather";
import penIcon from "../assets/icons/pen/pen.png";
import trashIcon from "../assets/icons/trash/trash.png";

interface TasksItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({id, newTitle}: EditTaskArgs) => void;
}


export function TaskItem({task, toggleTaskDone, removeTask, editTask}: TasksItemProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [taskValue, setTaskValue] = useState(task.title)
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setIsEditing(true)
    }

    function handleCancelEditing() {
        setTaskValue(task.title)
        setIsEditing(false)
    }

    function handleSubmitEditing() {
        editTask({id: task.id, newTitle: taskValue})
        setIsEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus()
            } else {
                textInputRef.current.blur()
            }
        }
    }, [isEditing])

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
                        {task.done && (<Icon name="check" size={12} color="#FFF"/>)}
                    </View>

                    <TextInput
                        value={taskValue}
                        onChangeText={setTaskValue}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.containerIcons}>
                {
                    isEditing
                        ? (
                            <TouchableOpacity
                                onPress={handleCancelEditing}
                            >
                                <Icon name={'x'} size={24} color={'#b2b2b2'}/>
                            </TouchableOpacity>
                        )
                        : (
                            <TouchableOpacity
                                onPress={handleStartEditing}
                            >
                                <Image source={penIcon}/>
                            </TouchableOpacity>
                        )
                }

                <View style={styles.iconDivider}/>

                <TouchableOpacity
                    onPress={() => removeTask(task.id)}
                    disabled={isEditing}
                >
                    <Image source={trashIcon} style={{opacity: isEditing ? 0.2 : 1}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    containerIcons: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingRight: 24,
        paddingLeft: 17
    },
    iconDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 12,
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium',
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium',
    },
});
