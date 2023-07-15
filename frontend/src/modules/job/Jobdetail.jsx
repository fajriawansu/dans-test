/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Apiservice from "../../services/Apiservice";
import { Card, Descriptions } from "antd";
import MyButton from "../../components/MyButton";

export default function Jobdetail() {
  const {jobId} = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();

  const fetchData = async () => {
    const resp = await Apiservice.JobService.getJobDetail(jobId);
    if(resp.status == 200){
      setData(resp.data);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className="w-full p-4">
      <div className="flex gap-3 items-center text-2xl p-3 font-bold bg-green-800 text-white fixed left-0 top-0 w-full z-10">
        <div className="w-20 text-base font-normal"><MyButton label="< back" onClick={() => navigate("/job")} /></div>
        LINKEDON
      </div>
      <div className="flex gap-4 mt-14">
        <div className="w-2/5">
            <Card title="Job Info">
              <Descriptions column={1}>
                <Descriptions.Item label="Position">{data?.title}</Descriptions.Item>
                <Descriptions.Item label="Company Name">{data?.company}</Descriptions.Item>
                {data?.company_url && <Descriptions.Item label="Company Site">
                  <a href={data?.company_url} target="_blank" rel="noreferrer">{data?.company_url}</a>
                </Descriptions.Item>}
                <Descriptions.Item label="Location">{data?.location}</Descriptions.Item>
                <Descriptions.Item label="Created Date">{data?.created_at}</Descriptions.Item>
              </Descriptions>
            </Card>
            <Card title="How to Apply">
              <div dangerouslySetInnerHTML={{__html: data?.how_to_apply}} />
            </Card>
        </div>
        <div className="w-3/5">
          <Card
            title="Job Description"
            bordered
          >
            <div dangerouslySetInnerHTML={{__html: data?.description}} 
            className="overflow-y-auto"
            style={{height: 600}} />
          </Card>
        </div>
      </div>
    </div>
  )
}
