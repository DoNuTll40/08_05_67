import { useState } from "react";
import UseAuth from "../hooks/UseAuth"
import PersonAuth from "../hooks/PersonAuth";

function Index() {

    const { user, logout } = UseAuth();
    const { person } = PersonAuth();

    const [rowsPerPage, setRowsPerPage] = useState(10)

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(person.length / rowsPerPage);

    const hdlPageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    console.log(user.fullname)

    const startIndex = (currentPage - 1) * rowsPerPage;
    const selectedData = person.slice(startIndex, startIndex + rowsPerPage);

    const hdlChange = (e) => {
        setRowsPerPage(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="max-w-[80rem] mx-auto">
            <div className="flex flex-col gap-4">
                <div className="border p-2 rounded-md">
                    <div className="flex justify-between items-center">
                        <h1 className="text-1xl font-bold">ข้อมูล</h1>
                        <div className="flex gap-2 items-center">
                            {/* <h1>{user.fullname}</h1> */}
                            <button className="p-2 px-4 border-2 border-red-600 rounded-md text-red-600 font-bold hover:bg-red-600 hover:text-white transition ease-in-out scale-100 active:scale-95" onClick={() => logout()}>ออกจากระบบ</button>
                        </div>
                    </div>
                </div>
                <div className="border p-4 rounded-md">
                    <div className="flex justify-end">
                        {person.length === 0 ? (
                            <span className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-800"></span>
                        ) : (
                            <p>ข้อมูลของวันที่ {person[0]?.VsDate}</p>
                        )}
                    </div>
                    {person.length === 0 ? (
                        <div className="flex justify-center">
                            <span className="font-bold">กำลังโหลดข้อมูล...</span>
                        </div>
                    ) : (
                        <div>
                            <table className="w-full">
                                <thead>
                                    <tr className="h-10">
                                        {/* <th>No.</th> */} 
                                        <th>เลข HN</th>
                                        <th>ชื่อ - นามสกุล</th>
                                        <th>อายุ</th>
                                        <th>สิทธิ์</th>
                                        <th>ประเภทการมา</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedData.map((el, index) => (
                                        <tr key={index}>
                                            {/* <td>{index + 1}</td> */}
                                            <td>{el.hn}</td>
                                            <td>{el.fullname}</td>
                                            <td>{el.age} ปี</td>
                                            <td>{el.subinsname}</td>
                                            <td>{el.INCTyp}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-between items-center mt-5">
                                <div className="flex gap-2 items-center">
                                    <p>จำนวนที่แสดง</p>
                                    <select className="rounded-md border px-4 py-1" name="rowsPerPage" onChange={hdlChange}>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value={person.length}>ทั้งหมด</option>
                                    </select>
                                </div>
                                <div className="flex items-center justify-end gap-5">
                                    <button
                                        className="bg-pink-600 px-4 py-1 rounded-md text-white font-bold hover:bg-pink-500 scale-100 disabled:opacity-70 disabled:hover:bg-pink-600 disabled:scale-100 active:scale-95 disabled:cursor-not-allowed"
                                        onClick={() => hdlPageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        ก่อนหน้า
                                    </button>
                                    <span>
                                        หนัาที่ {currentPage} ทั้งหมด {totalPages} หนัา
                                    </span>
                                    <button
                                        className="bg-pink-600 px-4 py-1 rounded-md text-white font-bold hover:bg-pink-500 scale-100 disabled:opacity-70 disabled:hover:bg-pink-600 disabled:scale-100 active:scale-95 disabled:cursor-not-allowed"
                                        onClick={() => hdlPageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        ถัดไป
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Index