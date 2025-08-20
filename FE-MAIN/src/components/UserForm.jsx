import React, { useState, useEffect } from 'react';

const ROLE_OPTIONS = [
  { value: 'ROLE_CUSTOMER', label: 'Customer' },
  { value: 'ROLE_SELLER', label: 'Seller' },
];

export default function UserForm({ user, onClose, onSubmit }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    roles: []
  });

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName,
        email: user.email,
        password: '',
        roles: user.roles
      });
    }
  }, [user]);

  const change = e => {
    const { name, value, type, checked } = e.target;
    if (name === 'roles') {
      setForm(f => {
        const next = checked
          ? [...f.roles, value]
          : f.roles.filter(r => r !== value);
        return { ...f, roles: next };
      });
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const submit = e => {
    e.preventDefault();
    const payload = { ...form };
    if (payload.password == "") delete payload.password; // password required only khi thêm
    if (user) payload.userId = user.userId;
    console.log('Submitting user:', payload);
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{user ? 'Sửa tài khoản' : 'Thêm tài khoản'}</h2>
        <form onSubmit={submit} className="space-y-4">
          {['fullName','email','password'].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium">
                {field==='fullName'?'Họ và Tên': field==='email'?'Email':'Mật khẩu'}
              </label>
              <input
                type={field==='password'?'password':'text'}
                name={field}
                value={form[field]}
                onChange={change}
                className="mt-1 block w-full px-3 py-2 border rounded"
                required={field!=='password' || !user /* password bắt buộc khi tạo */}
              />
            </div>
          ))}

          <div>
            <span className="block text-sm font-medium">Vai trò</span>
            <div className="flex gap-4 mt-1">
              {ROLE_OPTIONS.map(r => (
                <label key={r.value} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="roles"
                    value={r.value}
                    checked={form.roles.includes(r.value)}
                    onChange={change}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Hủy</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
              {user ? 'Lưu' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
