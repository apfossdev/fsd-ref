import { useRef, useState } from "react";
import { Button } from "./Buttons";

export const Otp = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const [disabled, setDisabled] = useState(true);

  return (
    <div className="flex justify-center">
      <SubOtpBox
        reference={ref1}
        onDone={() => {
          ref2.current.focus();
        }}
        onBack={() => ref1.current.focus()}
      />
      <SubOtpBox
        reference={ref2}
        onDone={() => {
          ref3.current.focus();
        }}
        onBack={() => {
          ref1.current.focus();
        }}
      />
      <SubOtpBox
        reference={ref3}
        onDone={() => {
          ref4.current.focus();
        }}
        onBack={() => {
          ref2.current.focus();
        }}
      />
      <SubOtpBox
        reference={ref4}
        onDone={() => {
          ref5.current.focus();
        }}
        onBack={() => {
          ref3.current.focus();
        }}
      />
      <SubOtpBox
        reference={ref5}
        onDone={() => {
          ref6.current.focus();
        }}
        onBack={() => {
          ref4.current.focus();
        }}
      />
      <SubOtpBox
        reference={ref6}
        onDone={() => {
          // handle last input
          setDisabled(false);
        }}
        onBack={() => {
          ref5.current.focus();
          setDisabled(true);
        }}
      />
      <Button disabled={disabled}>Sign up</Button>
    </div>
  );
};

const SubOtpBox = ({ reference, onDone, onBack }) => {

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && e.target.value === "") {
      onBack();
    }
  }

  const handleChange = (e) => {
    if (/^\d$/.test(e.target.value)) {
      if (e.target.value.length === 1) {
        onDone();
      }
    } else {
      e.target.value = ""; // Clear the input if it's not a digit
    }
  }

  return (
    <div>
      <input
        ref={reference}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        maxLength="1"
        className="m-1 w-[40px] h-[50px] rounded-2xl bg-blue-500 outline-none px-4 text-white"
      ></input>
    </div>
  );
};
