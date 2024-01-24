import { useEffect, useReducer, useRef, useState } from "react";
import useWindowResize from "../hooks/useWindowResize";
import useApp from "../hooks/useApp";
import { useAppDispatch, useAppSelector } from "../store/store";
import { resetUser, setUser } from "../store/reducers/usersReducer";
import { useGetToDoByIdQuery, useGetToDosQuery, useLazyGetToDoByIdQuery } from "../services/api";

type Step = {
  step: number
}
type Action = {
  type: string;
  payload?: number
}

const reducer = (state: Step, action: Action) => {
  switch (action.type) {
    case 'next':
      return { step: state.step + 1 };
    case 'back':
      return { step: state.step - 1 };
    case 'jump':
      return { step: action.payload ?? 0 };
    default:
      return { step: 0 };

  }
}



function Home() {
  const [value, setValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleResize, ...size } = useWindowResize();
  const { theme, changeTheme } = useApp();
  const user = useAppSelector(state => state.users)
  const storeDispatch = useAppDispatch()
  const { data = [], error, isLoading, isError } = useGetToDosQuery();
  const [getToDoById] = useLazyGetToDoByIdQuery()


  const [state, dispatch] = useReducer(reducer, { step: 0 }, (step: Step) => { return step; })


  // console.log(size);

  // useEffect(() => {
  //   console.log(inputRef.current?.name);
  //   return () => {
  //     // cleanup
  //   };
  // }, [value.length])

  function handleClick() {
    dispatch({ type: 'next' })
  }

  function handleThemeChange() {
    const newTheme = theme == 'dark' ? 'light' : 'dark';
    changeTheme(newTheme);
  }

  function setStoreUser() {
    storeDispatch(setUser({ email: 'test@tester.com', name: '75Way' }));
  }

  function resetStoreUser() {
    storeDispatch(resetUser());
  }

  async function getInitData() {
    const data = await getToDoById(1).unwrap();
    console.log(data);
  }

  useEffect(() => { getInitData(); }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }


  return <div className="center">
    <h1>Name: {user.name}</h1>
    {/* <button onClick={()=> dispatch({ type: 'next' })}>{state.step} Next</button>
  <button onClick={()=> dispatch({ type: 'back' })}>{state.step} Back</button>
  <button onClick={()=> dispatch({ type: 'jump', payload: 10 })}>{state.step} Jump</button> */}
    <button className={theme} onClick={handleThemeChange}>Change theme</button>
    <button className={theme} onClick={setStoreUser}>Set user</button>
    <button className={theme} onClick={resetStoreUser}>Reset user</button>
  </div>
}
export default Home;