import {useEffect, useState} from "react";
import {DashboardService} from "../../api/services/DashboardService.ts";
import {Card, Col, Row} from "antd";
import {
    AppstoreOutlined,
    LikeOutlined,
    ThunderboltOutlined
} from '@ant-design/icons';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import PieChartCampaign from "./PieChart.tsx";

const DashboardPage = () => {
  const [campaignCount, setCampaignCount] = useState(0);
  const [voteCount, setVoteCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [topVotes, setTopVotes] = useState<any[]>([]);
  const [campaignsPieChartData, setCampaignsPieChartData] = useState<any[]>([]);
  const [campaignTop, setCampaignTop] = useState<any>({});
  const [voteTop, setVoteTop] = useState<any>({});
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
    DashboardService.getTopVotes().then(res => {
      setTopVotes(res);
    });
    DashboardService.getCampaignPie().then(res => {
      setCampaignsPieChartData(res);
    });
    DashboardService.getTopCampaign().then(res => {
        setCampaignTop(res);
    });
    DashboardService.getTopVote().then(res => {
        setVoteTop(res);
    });

  }, []);
  return (
      <>
          <Row gutter={[16,16]}>
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
              <Col span={12}>
                  <Card
                      title={"Top vote phổ biến"}
                      className="
                        rounded-2xl
                        shadow-md
                        hover:shadow-2xl hover:-translate-y-1
                        transition-all duration-300
                      "
                      bodyStyle={{ padding: 24 }}
                  >
                      <BarChart
                          style={{ width: '100%', maxWidth: '50vw', maxHeight: '30vh', aspectRatio: 1.618 }}
                          responsive
                          data={topVotes}
                          margin={{
                              top: 5,
                              right: 0,
                              left: 0,
                              bottom: 50,
                          }}
                      >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                          <YAxis width="auto" />
                          <Tooltip />
                          <Legend />
                          <Bar name={"Tổng điểm"} dataKey="totalChoose" fill="#13463d" activeBar={{ fill: '#67AE6E', stroke: '#187068' }} radius={[10, 10, 0, 0]} />
                      </BarChart>
                  </Card>

              </Col>
              <Col span={12}>
                  <Card
                      title={"Thống kê chiến dịch"}
                      className="
                        rounded-2xl
                        shadow-md
                        hover:shadow-2xl hover:-translate-y-1
                        transition-all duration-300
                      "
                      bodyStyle={{ padding: 24 }}
                  >
                    <PieChartCampaign data={campaignsPieChartData} />
                  </Card>
              </Col>
              <Col span={12}>
                  <Card
                      title={"Chiến dịch được quan tâm nhiều"}
                      className="
                        rounded-2xl
                        shadow-md
                        hover:shadow-2xl hover:-translate-y-1
                        transition-all duration-300
                      "
                      bodyStyle={{ padding: 24 }}
                  >
                    <div className="flex items-center">
                        <div className="w-36 h-36 mr-4 rounded-lg overflow-hidden flex-shrink-0" style={{ boxShadow: '0 8px 20px rgba(19,70,61,0.10)' }}>
                            {campaignTop?.campaign?.image ? (
                                <img
                                    src={campaignTop.campaign.image}
                                    alt={campaignTop?.campaign?.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(135deg, #e6fffa, #d1fae5)',
                                    color: '#13463d'
                                }}>
                                    <AppstoreOutlined style={{ fontSize: 32 }} />
                                </div>
                            )}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ paddingRight: 12 }}>
                                    <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>{campaignTop?.campaign?.name || 'Chưa có chiến dịch'}</h3>
                                    <p style={{ marginTop: 8, marginBottom: 0, color: '#475569', maxHeight: 48, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 13 }}>{campaignTop?.campaign?.description || 'Không có mô tả'}</p>

                                    <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
                                        <span style={{ fontSize: 12, color: '#6b7280' }}>Ngày tạo: <strong style={{ color: '#374151' }}>{campaignTop?.campaign?.createdAt ? new Date(campaignTop.campaign.createdAt).toLocaleDateString() : '—'}</strong></span>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'right', marginLeft: 8 }}>
                                    <div style={{ fontSize: 12, color: '#6b7280' }}>Tổng lượt quan tâm</div>
                                    <div style={{ fontSize: 36, fontWeight: 900, color: '#13463d', marginTop: 6 }}>{campaignTop?.totalTransactions ?? 0}</div>
                                    <div style={{ marginTop: 8 }}>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '6px 12px',
                                            background: 'linear-gradient(135deg, #67AE6E, #187068)',
                                            color: 'white',
                                            borderRadius: 999,
                                            fontWeight: 700,
                                            fontSize: 12
                                        }}>Top</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </Card>
              </Col>
              <Col span={12}>
                  <Card
                      title={"Vote có số điểm nhiều nhất"}
                      className="
                        rounded-2xl
                        shadow-md
                        hover:shadow-2xl hover:-translate-y-1
                        transition-all duration-300
                      "
                      bodyStyle={{ padding: 24 }}
                  >
                      <div className="flex items-center">
                          <div className="w-36 h-36 mr-4 rounded-lg overflow-hidden flex-shrink-0" style={{ boxShadow: '0 8px 20px rgba(255,127,80,0.10)' }}>
                              {voteTop?.vote?.image ? (
                                  <img
                                      src={voteTop.vote.image}
                                      alt={voteTop?.vote?.name}
                                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                  />
                              ) : (
                                  <div style={{
                                      width: '100%',
                                      height: '100%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      background: 'linear-gradient(135deg, #fff7ed, #fff1d6)',
                                      color: '#ff7f50'
                                  }}>
                                      <LikeOutlined style={{ fontSize: 32 }} />
                                  </div>
                              )}
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                  <div style={{ paddingRight: 12 }}>
                                      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>{voteTop?.vote?.name || 'Chưa có vote'}</h3>
                                      <p style={{ marginTop: 8, marginBottom: 0, color: '#475569', maxHeight: 48, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 13 }}>{voteTop?.vote?.description || 'Không có mô tả'}</p>

                                      <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
                                          <span style={{ fontSize: 12, color: '#6b7280' }}>Số lựa chọn: <strong style={{ color: '#374151' }}>{voteTop?.totalTransactions ?? 0}</strong></span>
                                      </div>
                                  </div>

                                  <div style={{ textAlign: 'right', marginLeft: 8 }}>
                                      <div style={{ fontSize: 12, color: '#6b7280' }}>Tổng điểm</div>
                                      <div style={{ fontSize: 36, fontWeight: 900, color: '#13463d', marginTop: 6 }}>{voteTop?.totalChoose ?? 0}</div>
                                      <div style={{ marginTop: 8 }}>
                                          <span style={{
                                              display: 'inline-block',
                                              padding: '6px 12px',
                                              background: 'linear-gradient(135deg, #ff7f50, #ffb868)',
                                              color: 'white',
                                              borderRadius: 999,
                                              fontWeight: 700,
                                              fontSize: 12
                                          }}>Hot</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </Card>
              </Col>
          </Row>
      </>
  )
}
export default DashboardPage;