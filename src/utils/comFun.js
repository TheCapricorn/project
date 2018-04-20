let comFun={
  rowSelection(){
    return{
      onChange: (selectedRowKeys, selectedRows) => {
      },
      onSelect: (record, selected, selectedRows) => {
        this.setState({
          selectedRows
        })
      },
      onSelectAll: (selected, selectedRows,) => {
        this.setState({
          selectedRows
        })
      }
    }
  },

};
export default comFun
