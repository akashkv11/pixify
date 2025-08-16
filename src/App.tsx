import { Form, Layout, type FormProps } from "antd";
import { useState } from "react";
import "./App.css";
import CustomForm from "./components/Form";
import Gallery from "./components/Gallery";
import {
  fetchImages,
  fetchRandomImage,
  type Options,
  type Tag,
} from "./services/image-fetch";

import logo from "/2.png";

const { Content, Footer, Header } = Layout;

function App() {
  const [form] = Form.useForm();
  const [collection, setCollection] = useState<string[]>([]);
  const [source, setSource] = useState<"waifuPics" | "waifuIm">("waifuPics");

  const onFinish: FormProps<Options>["onFinish"] = async (values) => {
    console.log("Success:", values);
    if (source === "waifuIm") {
      const data = await fetchRandomImage({
        tag: values.category as Tag,
        images: values.images,
        type: values.type,
      });
      return setCollection(data);
    }

    const data = await fetchImages(values);

    setCollection(data);
  };
  return (
    <>
      <Layout className="main-layout container">
        <Header className="header">
          <img
            src={logo} // your logo path
            alt="Logo"
            className="logo"
          />
          Pixify
        </Header>
        <Content className="content">
          <div className="main-container">
            <CustomForm
              source={source}
              onFinish={onFinish}
              form={form}
              setSource={setSource}
            />
            <Gallery collection={collection} />
          </div>
        </Content>
        <Footer className="footer">
          <p className="copyright">
            <span>Copyright &copy;</span>
            <span>{new Date().getFullYear()}</span>
            <span>Pixify</span>
          </p>
        </Footer>
      </Layout>
    </>
  );
}

export default App;
