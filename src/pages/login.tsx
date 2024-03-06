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
import { logIn } from '../app/features/user-slice';
import { useAppDispatch, useAppSelector } from '../app/types';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { loading, user, error } = useAppSelector((state) => state.user);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(logIn({ identifier: email, password }));
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);
  return (
    <>
      <Modal isOpen={true} placement="top-center">
        <form onSubmit={handleLogin}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email || Username"
                placeholder="Enter your email"
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
                <Link color="primary" to="/register" className="text-blue-500">
                  have an account? <b>Register</b>
                </Link>
                {error && <p className="text-red-500 ">{error.details.error.message}</p>}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
