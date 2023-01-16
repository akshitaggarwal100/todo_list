import { useState, useRef } from 'react'
import { MdAddCircleOutline } from 'react-icons/md'
import './Todos.css'
import { db } from '../../../FirebaseConfig'
import { doc, getDoc, arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore'
import { useUserDataContext } from '../../../AppContext'
import { useEffect } from 'react'

export default function Todos() {
    const [user, setUser] = useState({ todos: [] })
    const [todoInput, setTodoInput] = useState(false)
    const todoInputForm = useRef(null)

    let { currentUser } = useUserDataContext()
    useEffect(() => {
        return async () => {
            const response = await getDoc(doc(db, 'users', currentUser.uid))
            setUser(response.data())
        }
    }, [user])

    async function taskDone(e) {
        await updateDoc(doc(db, 'users', currentUser.uid), { todos: arrayRemove(e.target.previousSibling.innerText) })
    }

    function TodoInputSwitch() {
        setTodoInput(!todoInput)
    }

    async function addTodo(e) {
        e.preventDefault()
        await updateDoc(doc(db, 'users', currentUser.uid), { todos: arrayUnion(todoInputForm.current.todo.value) })
        todoInputForm.current.todo.value = ''
    }

    return (
        <div className='todoContainer'>
            {user.todos.map((todo, index) => (
                <article key={index} className='todo'>
                    <p className='todoTask'>{todo}</p>
                    <button onClick={taskDone} className='todoAction'>Done</button>
                </article>
            ))}

            <MdAddCircleOutline onClick={TodoInputSwitch} className='addBtn' />

            <form ref={todoInputForm} className={todoInput ? 'todoInputForm' : 'disable'} onSubmit={addTodo}>
                <input name='todo' className='inputTodo' type="text" />
                <button type='submit' className='addTodoBtn'>Add</button>
            </form>
        </div>
    )
}
