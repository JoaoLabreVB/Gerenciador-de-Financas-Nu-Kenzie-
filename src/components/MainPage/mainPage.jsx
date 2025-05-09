import "./styleMainPage.css";
import Form from "./Form/form";
import Header from "./Header/Header";
import List from "./List/List";
import TotalMoney from "./TotalMoney/TotalMoney";
import Navigation from "./Navigation/Navigation";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function MainPage() {
  const { user, logout } = useAuth();
  const [toDoList, setToDoList] = useState([]);
  const [listFilter, setListFilter] = useState([]);
  const [valorInput, setValorInput] = useState("");
  const [valorDinheiro, setValorDinheiro] = useState("");
  const [tipoValor, setTipoValor] = useState("");

  return (
    <>
      <Header user={user} logout={logout} />
      <main className="mainPage">
        <aside className="aside">
          <div className="containerFormTotalMoney">
            <Form
              toDoList={toDoList}
              setToDoList={setToDoList}
              valorInput={valorInput}
              setValorInput={setValorInput}
              valorDinheiro={valorDinheiro}
              setValorDinheiro={setValorDinheiro}
              tipoValor={tipoValor}
              setTipoValor={setTipoValor}
            />
            <TotalMoney toDoList={toDoList} />
          </div>
        </aside>
        <div className="containerNavigationEList">
          <Navigation
            listFilter={listFilter}
            setListFilter={setListFilter}
            toDoList={toDoList}
          />
          <List
            tipoValor={tipoValor}
            listFilter={listFilter}
            toDoList={toDoList}
            setToDoList={setToDoList}
            setListFilter={setListFilter}
          />
        </div>
      </main>
    </>
  );
}