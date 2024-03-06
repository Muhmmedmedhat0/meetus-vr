import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
import { MailIcon } from '../components/icons/mail';
import { LockIcon } from '../components/icons/lock';
import { useEffect, useState } from 'react';
import { register } from '../app/features/user-slice';
import { useAppDispatch, useAppSelector } from '../app/types';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const { loading, user, error } = useAppSelector((state) => state.user);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(register({ username, email, password }));
    setEmail('');
    setPassword('');
    setUsername('');
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);
  // username
  return (
    <>
      <Modal isOpen={true} placement="top-center">
        <form onSubmit={handleLogin}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
            <ModalBody>
              <Input
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="username"
                type="name"
                placeholder="Enter your username"
                variant="bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex py-2 px-1 justify-between">
                <Link color="primary" to="/login" className="text-blue-500">
                  have an account? <b>Login</b>
                </Link>
                {error && (
                  <p className="text-red-500 ">{error.details.error.message}</p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                {loading ? 'Signing up...' : 'Sign up'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
