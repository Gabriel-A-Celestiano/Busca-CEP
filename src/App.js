import { useRef, useState } from "react";
import { FiSearch, FiTrash } from "react-icons/fi";
import { useCep } from "./hooks/hooks";
import { valideCep } from "./validations";
import { useAlert } from "react-alert";
import InputMask from "react-input-mask";
import "./App.css";

function App() {
  const inputRef = useRef();
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  const request = useCep();
  const alert = useAlert();

  function clearInput() {
    setInput("");
    if (inputRef.current) {
      inputRef.current.select();
    }
  }
  function handleClearInputAndCep(e) {
    clearInput();
    setCep({});
    e.preventDefault();
  }

  async function handleSearch() {
    setCep({});
    try {
      if (valideCep(input) === false) {
        alert.error("Cep inválido");
        clearInput();
      } else {
        const response = await request(input);
        if (response.status === 200) {
          if (!response.data.hasOwnProperty("erro")) {
            setCep(response.data);
            clearInput();
          } else {
            alert.error("Cep inexistente");
            clearInput();
          }
        }
      }
    } catch {
      alert.error("Cep inválido");
      clearInput();
    }
  }

  async function handleInputKeyUp(e) {
    if (e.key === "Enter") {
      await handleSearch();
      e.preventDefault();
    }
    return true;
  }

  return (
    <div className="App">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <InputMask mask="99999-999" ref={inputRef} onKeyUp={handleInputKeyUp} onChange={(e) => setInput(e.target.value)} value={input} placeholder="Digite seu cep" />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="FFF" />
        </button>
      </div>
      {Object.keys(cep).length > 1 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          {cep.logradouro && <span>{cep.logradouro}</span>}
          {cep.bairro && <span>{cep.bairro}</span>}
          {cep.localidade && (
            <span>
              {cep.localidade} - {cep.uf}{" "}
            </span>
          )}
          <span>
            <button className="button-clear" onClick={handleClearInputAndCep}>
              <FiTrash size={20} color="FFF" />
            </button>
          </span>
        </main>
      )}
    </div>
  );
}
export default App;
