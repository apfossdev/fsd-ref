import './App.css'

function App() {

  return (
    <div className='grid grid-cols-12'>
      <div className="col-span-12 sm:col-span-5 bg-red-500 ">Child 1</div>
      <div className='col-span-12 sm:col-span-5 bg-yellow-500 '>Child 2</div>
      <div className='col-span-12 sm:col-span-2 bg-pink-500 '>Child 3</div>
    </div>
  )
}

export default App
