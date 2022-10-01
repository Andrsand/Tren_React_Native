import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from '../types'
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

  const addTodo = async title => {
    const response = await fetch('https://rn-todo-app-db82f-default-rtdb.firebaseio.com/todos.json',  // подключаемся к серверу с базой данных. Работаем с массивом todos используя json.
      {
        method: 'POST',  // метод создания объекта на сервере
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })       // приводим title к строке
      }
    )
    const data = await response.json()    // ответ сервера
    console.log('ID', data.name)
    dispatch({ type: ADD_TODO, title, id: data.name })
  }

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

  const fetchTodos = async () => {
    showLoader() // вызываем метод showloader чтобы был виден индикатор загрузки
    clearError() // очистка ошибки перед тем как продолжить грузить данные
    try {
      const response = await fetch('https://rn-todo-app-db82f-default-rtdb.firebaseio.com/todos.jso', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      console.log('Fetch date', data)
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
      dispatch({ type: FETCH_TODOS, todos })
    } catch (e) {
      showError('Что-то пошло не так...')
      console.log(e)
    } finally {
      hideLoader() // когда прилетят данные с сервера - вызываем метод hideLoader
    }
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
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
