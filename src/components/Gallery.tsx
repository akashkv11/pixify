import { Image, Space, Spin } from "antd";
import {
  DownloadOutlined,
  LeftOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { useState } from "react";

type Props = {
  collection: string[];
};

const Gallery: React.FC<Props> = ({ collection }) => {
  const [current, setCurrent] = useState(0);

  const onDownload = () => {
    const url = collection[current];
    const suffix = url.slice(url.lastIndexOf("."));
    const filename = Date.now() + suffix;

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(blobUrl);
        link.remove();
      });
  };

  return (
    <div className="container masonry">
      <Image.PreviewGroup
        preview={{
          toolbarRender: (
            _,
            {
              transform: { scale },
              actions: {
                onActive,
                onFlipY,
                onFlipX,
                onRotateLeft,
                onRotateRight,
                onZoomOut,
                onZoomIn,
                onReset,
              },
            }
          ) => (
            <Space size={12} className="toolbar-wrapper">
              <LeftOutlined
                disabled={current === 0}
                onClick={() => onActive?.(-1)}
              />
              <RightOutlined
                disabled={current === collection.length - 1}
                onClick={() => onActive?.(1)}
              />
              <DownloadOutlined onClick={onDownload} />
              <SwapOutlined rotate={90} onClick={onFlipY} />
              <SwapOutlined onClick={onFlipX} />
              <RotateLeftOutlined onClick={onRotateLeft} />
              <RotateRightOutlined onClick={onRotateRight} />
              <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
              <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
              <UndoOutlined onClick={onReset} />
            </Space>
          ),
          onChange: (index) => setCurrent(index),
        }}
      >
        {collection.map((url, index) => (
          <Image
            key={index}
            className="single-image"
            src={url}
            alt={`Image ${index + 1}`}
            placeholder={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <Spin />
              </div>
            }
          />
        ))}
      </Image.PreviewGroup>
    </div>
  );
};

export default Gallery;
