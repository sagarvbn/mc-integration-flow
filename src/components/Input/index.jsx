const Input = ({ type, name, className, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      className={`${className} border border-slate-500 rounded-md text-base px-2 py-1`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default Input
