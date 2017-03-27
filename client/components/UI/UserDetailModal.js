import React, {PropTypes} from 'react';
import {Form, Input, InputNumber, Radio, Modal} from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const modal = ({
  visible,
  type,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        key: item.key
      };
      onOk(data);
    });
  }

  const modalOpts = {
    title: `${type === 'create' ? '新建用户' : '修改用户'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  };

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="登录名：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('loginname', {
            initialValue: item.loginname,
            rules: [
              {
                required: true,
                message: '登录名未填写'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label="昵称：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('useralias', {
            initialValue: item.useralias,
            rules: [
              {
                required: true,
                message: '昵称未填写'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label="电话：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('tel', {
            initialValue: item.tel
          })(<Input />)}
        </FormItem>
        <FormItem label="邮箱：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                required: true,
                message: '不能为空'
              }
            ]
          })(<Input />)}
        </FormItem>
        {(type === 'create') && (
          <FormItem label="初始密码：" hasFeedback {...formItemLayout}>
            {getFieldDecorator('password', {
              initialValue: item.password,
              rules: [
                {
                  required: true,
                  message: '不能为空'
                }
              ]
            })(<Input />)}
          </FormItem>
        )}
      </Form>
    </Modal>
  );
};

modal.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired
}

export default Form.create()(modal)
