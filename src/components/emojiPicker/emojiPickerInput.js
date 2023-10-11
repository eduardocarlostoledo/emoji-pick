import { useRef } from "react";
import EmojiPicker from "./emojiPicker";



export default function EmojiPickerInput(){
    const refInput = useRef(null);

    /* function handleClick (){
        refInput.current.focus(); // este metodo hace que al hacer click en el boton, el cursor vuelva al cuadro de texto. Va de la mano con useEffect()
        return <buton onClick={handleClick}>Da Click</buton>
    } */

    return (
    <div>
        <input ref={refInput}/>
    
        <EmojiPicker ref={refInput} />
    </div>
            );
}