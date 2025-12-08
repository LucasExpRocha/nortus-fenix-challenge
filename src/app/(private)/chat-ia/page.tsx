'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';

import { chatService } from '@/app/services/chat.service';
import Balloon from '@/components/ui/Balloon';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Cards';
import { timeNow } from '@/lib/utils/dateTime';

export default function ChatIa() {
  const { data } = useQuery<ChatIA>({
    queryKey: ['chat-ia'],
    queryFn: chatService.getChat,
    structuralSharing: true,
    retry: 2,
    retryDelay: 1000,
    refetchInterval: 5 * 1000,
  });

  const [messages, setMessages] = useState<ChatIAMessage[]>(
    (data?.messages ?? []) as ChatIAMessage[]
  );
  const [input, setInput] = useState('');

  function sendUserMessage() {
    const content = input.trim();
    if (!content) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `msg_${Date.now()}`,
        author: 'Assistente',
        content,
        timestamp: timeNow(),
        type: 'assistant_message',
      },
    ]);
    setInput('');
  }

  function sendQuickSuggestion() {
    const content = data?.iaSuggestion ?? '';
    if (!content) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `msg_${Date.now()}`,
        author: 'Assistente',
        content,
        timestamp: timeNow(),
        type: 'assistant_message',
      },
    ]);
  }

  const listRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      <section aria-label="Campo de mensagens">
        <Card className="m-auto h-full min-h-[40svh] max-h-[60svh] max-w-[75svw]">
          <div
            ref={listRef}
            className="h-full overflow-y-auto scroll-smooth pr-2 pb-2 chat-scroll flex flex-col gap-10"
            style={{ scrollbarGutter: 'stable' }}
          >
            {messages.map((message) => (
              <div
                className={`w-full ${message.type === 'user_message' ? 'justify-items-start' : 'justify-items-end'}`}
                key={message.id}
                aria-label={`mensagem ${message.content}`}
              >
                <Balloon
                  isUser={message.type === 'user_message'}
                  text={message.content}
                  time={message.timestamp}
                  title={message.author}
                />
                {message.type === 'ai_suggestion' &&
                  (data?.conversationAnalysis?.futureSteps?.actions?.length ??
                    0) > 0 && (
                    <div className="mt-2 flex items-center gap-2 text-white/80 max-w-6/12">
                      {data?.conversationAnalysis?.futureSteps?.actions?.map(
                        (action) => (
                          <Button
                            key={action.id}
                            type="button"
                            className="text-xs shadow-[0_0_10px_0_#1876D2] cursor-pointer"
                          >
                            {action.action}
                          </Button>
                        )
                      )}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </Card>
      </section>
      <section aria-label="Entrada de mensagens" className="mt-4">
        {data?.iaSuggestion && (
          <div className="mb-4">
            <button
              type="button"
              onClick={sendQuickSuggestion}
              aria-label="Usar sugestão rápida da IA"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#0B1125] border border-slate-700 text-xs text-white hover:bg-[#12203a]"
            >
              {data?.iaSuggestion}
            </button>
          </div>
        )}
        <div className="relative w-full max-w-[942px] flex flex-col ml-[50%] translate-x-[-50%]">
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escreva aqui..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendUserMessage();
              }
            }}
            aria-label="Campo de mensagem"
            className="w-full h-20 rounded-[100px] bg-white/10 placeholder-slate-300 pl-[21.38px] pr-[70px] outline-none border border-white/20 opacity-100 shadow-[0_12px_12px_#0000001A,0_5px_5px_#0000000D]"
          />
          <button
            type="button"
            disabled={!input.trim()}
            onClick={sendUserMessage}
            aria-label="Enviar mensagem"
            className="absolute right-[8.91px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#1876D2] text-white hover:bg-[#2EA2FF] flex items-center justify-center cursor-pointer"
          >
            <FiSend />
          </button>
        </div>
      </section>
    </div>
  );
}
