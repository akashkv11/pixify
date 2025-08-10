import {
  Button,
  Form,
  Radio,
  Select,
  Switch,
  type FormInstance,
  Typography,
  Modal,
  Input,
} from "antd";
import React, { useState } from "react";
import {
  nsfw,
  nsfwCategories,
  sfwCategories,
  versatile,
} from "../constants/image-categories";
import type { Options } from "../services/image-fetch";

const { Text } = Typography;

type Props = {
  form: FormInstance;
  onFinish: (values: Options) => void;
  source: "waifuPics" | "waifuIm";
  setSource: React.Dispatch<React.SetStateAction<"waifuPics" | "waifuIm">>;
};
const CustomForm: React.FC<Props> = ({ form, onFinish, source, setSource }) => {
  const password = "openpixify";
  const [type, setType] = useState("sfw");
  const [isGuest, setIsGuest] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleTypeChange = (value: string) => {
    form.setFieldsValue({ category: null });
    setType(value);
  };

  const handleGuestChange = () => {
    if (isGuest) {
      setIsModalOpen(true);
    } else {
      setIsGuest(true);
      setType("sfw");
    }
  };

  const verifyPassword = () => {
    if (input === password) {
      setIsGuest(false);
    }
    setIsModalOpen(false);
    setInput("");
  };
  const handleSourceChange = (value: typeof source) => {
    setSource(value);
    form.resetFields();
  };

  const fetchCategory = (): ReadonlyArray<string> => {
    if (source === "waifuPics") {
      if (type === "sfw") {
        return sfwCategories;
      } else {
        return nsfwCategories;
      }
    } else {
      if (type === "sfw") {
        return versatile;
      } else {
        return nsfw;
      }
    }
  };

  return (
    <>
      <div className="card">
        <div className="tools">
          <div className="circle">
            <span className="red box"></span>
          </div>
          <div className="circle">
            <span className="yellow box"></span>
          </div>
          <div className="circle">
            <span className="green box"></span>
          </div>
        </div>
        <div className="card__content">
          <div className="form-layout">
            <Form form={form} onFinish={onFinish}>
              <div className="source-selector">
                <span>Source</span>
                <Select
                  value={source}
                  onChange={handleSourceChange}
                  style={{ width: 200 }}
                  defaultValue="waifuPics"
                >
                  <Select.Option value="waifuPics"> Waifu.pics </Select.Option>
                  <Select.Option value="waifuIm"> Waifu.im </Select.Option>
                </Select>
              </div>
              <Form.Item label="Images" name="images" initialValue={"single"}>
                <Radio.Group>
                  <Radio value="single"> Single </Radio>
                  <Radio value="many"> Many </Radio>
                </Radio.Group>
              </Form.Item>
              {!isGuest ? (
                <Form.Item label="Type" name="type">
                  <Select onChange={handleTypeChange} style={{ width: 200 }}>
                    <Select.Option value="sfw"> SFW </Select.Option>
                    <Select.Option value="nsfw"> NSFW </Select.Option>
                  </Select>
                </Form.Item>
              ) : null}
              <Form.Item label="Category" name="category">
                <Select style={{ width: 200 }}>
                  {fetchCategory().map((category) => {
                    return (
                      <Select.Option key={category} value={category}>
                        {category}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <div className="submit-layout">
                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
                <div className="guest-layout">
                  <Text>Guest</Text>
                  <Switch onClick={handleGuestChange} checked={isGuest} />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <Modal
        title="Owner Mode"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        centered
        onOk={verifyPassword}
      >
        <Text>Enter Password</Text>
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          autoFocus
        />
      </Modal>
    </>
  );
};

export default CustomForm;
