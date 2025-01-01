export const Button = ({ disabled,
   children, 
   onClick,
   variant //for small button or large button
   }) => {
  // below pointer is the ugly way of conditionally rendering classes
  // the better way is to use clsx, cx
  return <span onClick={onClick} className={` rounded-2xl text-4xl px-32 py-8 text-white cursor-pointer ${disabled ? "bg-blue-200" : "bg-green-400"}`}>
    {children}
  </span>
}


//native  css buttons are very ugly, so make divs buttons instead manually