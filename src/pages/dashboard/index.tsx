import {useEffect, useState} from "react";
import {DashboardService} from "../../api/services/DashboardService.ts";
import {Card, Col, Row} from "antd";
import {
    AppstoreOutlined,
    LikeOutlined,
    ThunderboltOutlined
} from '@ant-design/icons';

const DashboardPage = () => {
  const [campaignCount, setCampaignCount] = useState(0);
  const [voteCount, setVoteCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  useEffect(() => {
    DashboardService.getTotalCampaigns().then(res => {
      setCampaignCount(res);
    });
    DashboardService.getTotalVotes().then(res => {
      setVoteCount(res);
    });
    DashboardService.getTotalTransactions().then(res => {
      setTransactionCount(res);
    });
  }, []);
  return (
      <>
          <Row gutter={16}>
              <Col span={8}>
                  <Card
                      className="
                        rounded-2xl
                        shadow-md
                        hover:shadow-2xl hover:-translate-y-1
                        transition-all duration-300
                      "
                      style={{
                          background: 'linear-gradient(135deg, #13463d, #187068)',
                          boxShadow: '0 10px 30px rgba(59,130,246,0.35)',
                          color: 'white',
                      }}
                      bodyStyle={{ padding: 24 }}
                  >
                      <div className="flex items-center justify-between">
                          <div>
                              <p className="text-sm opacity-80">Số chiến dịch</p>
                              <p className="text-4xl font-extrabold mt-2">
                                  {campaignCount}
                              </p>
                          </div>
                          <div className="text-4xl opacity-90">
                              <AppstoreOutlined />
                          </div>
                      </div>
                  </Card>
              </Col>

              {/* Vote */}
              <Col span={8}>
                  <Card
                      className="
                        rounded-2xl
                        text-white
                        shadow-md
                        hover:shadow-2xl hover:-translate-y-1
                        transition-all duration-300
                      "
                      style={{
                          background: 'linear-gradient(135deg, #13463d, #187068)',
                          boxShadow: '0 10px 30px rgba(59,130,246,0.35)',
                          color: 'white',
                      }}
                      bodyStyle={{ padding: 24 }}
                  >
                      <div className="flex items-center justify-between">
                          <div>
                              <p className="text-sm opacity-80">Số vote</p>
                              <p className="text-4xl font-extrabold mt-2">
                                  {voteCount}
                              </p>
                          </div>
                          <div className="text-4xl opacity-90">
                              <LikeOutlined />
                          </div>
                      </div>
                  </Card>
              </Col>

              {/* Transaction */}
              <Col span={8}>
                  <Card
                      className="
                        rounded-2xl
                        text-white
                        shadow-md
                        hover:shadow-2xl hover:-translate-y-1
                        transition-all duration-300
                      "
                      bodyStyle={{ padding: 24 }}
                      style={{
                          background: 'linear-gradient(135deg, #13463d, #187068)',
                          boxShadow: '0 10px 30px rgba(59,130,246,0.35)',
                          color: 'white',
                      }}
                  >
                      <div className="flex items-center justify-between">
                          <div>
                              <p className="text-sm opacity-80">Số lượt vote</p>
                              <p className="text-4xl font-extrabold mt-2">
                                  {transactionCount}
                              </p>
                          </div>
                          <div className="text-4xl opacity-90">
                              <ThunderboltOutlined />
                          </div>
                      </div>
                  </Card>
              </Col>
          </Row>
      </>
  )
}
export default DashboardPage;