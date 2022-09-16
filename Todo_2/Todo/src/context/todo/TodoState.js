import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import { ADD_TODO, CLEAR_ERROR, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from '../types'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'

// стейт для работы с сервером и логикой
export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false, // если идет загрузка то мы говорим компоненту, чтобы он реагировал соответсвующе 
    error: null
  }
  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = title => dispatch({ type: ADD_TODO, title })

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id)
    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            changeScreen(null)
            dispatch({ type: REMOVE_TODO, id })
          }
        }
      ],
      { cancelable: false }
    )

  }


  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title })

  // эти функции ￬ - вспомогательные и приватные для стейта ￪ TodoState

  const showLoader = () => dispatch({ type: SHOW_LOADER }) // функция показывает Loader. Она вызывается из todoReducer.js и флаг loading со значением true

  const hideLoader = () => dispatch({ type: HIDE_LOADER }) // этот dispatch делает тоже самое, только убирает Loader и меняет только один флаг в стейте на значение false

  const showError = error => dispatch({ type: SHOW_ERROR, error }) // в параметр error принимаем текст ошибки и выводим его 

  const clearError = () => dispatch({ type: CLEAR_ERROR }) // функция не принимает параметр, просто диспатчит CLEAR_ERROR

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
