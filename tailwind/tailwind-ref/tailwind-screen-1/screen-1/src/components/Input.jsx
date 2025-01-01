export const Input = ({
  onClick,
  type,
  placeholder
  
}) => {
  // below pointer is the ugly way of conditionally rendering classes
  // the better way is to use clsx, cx
  return (
    <span
      onClick={onClick}
      className={` p-8 text-4xl px-2 py-2 text-white cursor-pointer bg-blue-500 rounded-2xl `}
    >
      <input type={type} placeholder={placeholder} className="bg-blue-500 outline-none p-4"></input> 
    </span>
  );
};

//native  css buttons are very ugly, so make divs buttons instead manually
