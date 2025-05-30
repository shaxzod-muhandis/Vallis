import { components } from "react-select";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        {props.isSelected && <input
         className="mr-2"
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />}{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};
export default Option
