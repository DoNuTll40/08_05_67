import UseAuth from "../hooks/UseAuth"

function Index() {

    const { user } = UseAuth();

  return (
    <div className="max-w-[80rem] mx-auto">
        <div className="flex flex-col gap-4">
            <div className="border p-4 rounded-md">
                <h1>ข้อมูล    </h1>
            </div>
            <div className="border p-4 rounded-md">
                <p>{user.fullname}</p>
                <p>{user.fullname}</p>
                <p>{user.fullname}</p>
                <p>{user.fullname}</p>
                <p>{user.fullname}</p>
            </div>
        </div>
    </div>
  )
}

export default Index