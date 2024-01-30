import { memo } from "react";

type Props = {
    label: string;
    onClick: ()=>void;
    className?: string
}

function Button(props: Props){
    const { label, onClick, className } = props;
    return <button className={className} onClick={onClick}>{label}</button>
}
export default memo(Button);