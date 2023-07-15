/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Checkbox, Input, Pagination } from "antd"
import { useEffect, useState } from "react"
import MyButton from "../../components/MyButton"
import Apiservice from "../../services/Apiservice"
import { useNavigate } from "react-router-dom";

export default function Joblist() {

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    description: "",
    location: "",
    full_time: false
  })

  const fetchData = async (currentPage) => {
    let resp;
    if(currentPage) {
      resp = await Apiservice.JobService.getJobList(currentPage);
      setFilter({
        description: "",
        location: "",
        full_time: false
      })
    } else {
      resp = await Apiservice.JobService.getJobList(
        currentPage,
        filter.description,
        filter.location,
        filter.full_time
      );
    }
    if (resp.status == 200) setData(resp.data);
  };

  const handleSearch = () => {
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="px-4 pt-10 w-4/5">
      <div className="text-2xl p-3 font-bold bg-green-800 text-white fixed left-0 top-0 w-full z-10">LINKEDON</div>
      <div className="flex w-full gap-4 mt-8 p-3 items-end bg-green-100 rounded-xl shadow-md">
        <div className="w-full sticky">
          <div>Job Description</div>
          <Input value={filter.description} placeholder="filter by title, benefits, companies, etc" onChange={e => setFilter(prev => ({...prev, description: e.target.value}))} />
        </div>
        <div className="w-full">
          <div>Location</div>
          <Input value={filter.location} placeholder="filter by city, state, etc" onChange={e => setFilter(prev => ({...prev, location: e.target.value}))} />
        </div>
        <div className="w-full">
          <Checkbox checked={filter.full_time} onChange={e => setFilter(prev => ({...prev, full_time: e.target.value}))}>Full Time</Checkbox>
        </div>
        <div>
          <MyButton label="Search" onClick={handleSearch} />
        </div>
      </div>
      <div className="bg-green-100 rounded-xl shadow-md my-8 overflow-y-auto" style={{height: 500}}>
        {data?.filter(data => data?.title?.length > 0).map((v, k) => {
          return (
            <div key={k} onClick={() => navigate(`/job/${v?.id}`)}>
              <JobItem
              type={v?.type}
              title={v?.title}
              company={v?.company}
              location={v?.location}
              logo={v?.company_logo}
              date={v?.created_at}
            />
            </div>
          );
        })}
      </div>
      <Pagination defaultCurrent={1} total={20} onChange={e => fetchData(e)} />;
    </div>
  )
}

function JobItem({title, company, type, location, date, logo}) {
  return <div className="flex justify-between cursor-pointer p-4 hover:bg-green-200">
    {/* <image alt={title} src={logo} width={20} height={20} /> */}
    <div>
      <div className="font-bold text-base">{title}</div>
      <div>{company} - <span className="text-blue-900">{type}</span></div>
    </div>
    <div>
      <div>{location}</div>
      <div className="text-gray-700">{date}</div>
    </div>
  </div>
}
