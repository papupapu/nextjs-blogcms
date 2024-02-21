export default function Curve() {
  return (
    <div className="absolute w-full max-w-[100vw] min-h-screen top-0 overflow-hidden">
      <div className="absolute min-h-[400px] w-full pt-[100px] bg-sky-300">
        <div className="absolute bottom-0 w-full h-[250px] text-center">
          <div className="absolute w-[55%] h-full translate-x-[85%] translate-y-[60%] bg-sky-300 rounded-tl-[100%] rounded-tr-[50%] rounded-br-[100%] rounded-bl-[50%]" />
          <div className="absolute w-[55%] h-full translate-x-[-4%] translate-y-[40%] bg-sky-100 rounded-tl-[100%] rounded-tr-[50%] rounded-br-[100%] rounded-bl-[50%]" />
        </div>
      </div>
    </div>
  )
}