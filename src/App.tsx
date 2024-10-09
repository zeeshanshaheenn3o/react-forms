import React, { useState } from "react";
import { Button, Flex, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

export interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

type Props = {
  items?: DataType[];
};
const columns: TableColumnsType<DataType> = [
  { title: "Name", dataIndex: "name" },
  { title: "Age", dataIndex: "age" },
  { title: "Address", dataIndex: "address" },
];

const App: React.FC<Props> = (props) => {
  console.log("props : ", props);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={props.items}
      />
    </Flex>
  );
};

export default App;
