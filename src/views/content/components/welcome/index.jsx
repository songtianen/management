
import React from 'react'
import { Layout } from 'antd'

const { Content } = Layout

const Welcome = () => {
  return (
    <div>
      <Layout>
        <Content>
          <div style={{ height: 700, fontSize: 40, color: 'red', textAlign: 'center' }}>
            架构已写好，请写组件
            <br />
            人民有信仰! 国家有力量! 民族有希望!
            <br />
            共建社会主义核心价值观!
            <br />
            富强.民主.文明.和谐.自由.平等.公正.法治.爱国.敬业.诚信.友善
            <br />
            🚩🚩🚩
          </div>
        </Content>
      </Layout>
    </div>
  )
}
// Welcome.propTypes = {

// }

export default Welcome
