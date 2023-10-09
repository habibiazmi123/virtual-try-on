import React,{useEffect, useRef} from "react";

export default function Toggle(props) {
  const {
    text,
    size = "large",
    checked,
    disabled,
    onChange,
    offstyle = "btn-danger",
    onstyle = "btn-success",
    ActionCamera="Otomatis"
  } = props;

  // useEffect(() => {
  //   localStorage.setItem('actioncamera',ActionCamera);
  // }, [ActionCamera]);
  let displayStyle = checked ? onstyle : offstyle;
  return (
    <>
      <label>
        <span className={`${size} switch-wrapper`}>
            {/* {console.log(onChange)} */}
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={e => onChange(e)}
          />
          <span className={`${displayStyle} switch`}>
            <span className="switch-handle" />
          </span>
        </span>
        {/* <span className="switch-label">Manual</span> */}
      </label>
    </>
  );
}
