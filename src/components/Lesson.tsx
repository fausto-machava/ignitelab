import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import pt from 'date-fns/locale/pt';

interface LessonProps {
    title: string;
    slug?: string | null;
    availableAt: Date;
    type: 'live' | 'class';
};

export function Lesson(props: LessonProps) {
    const isLessonAvailable = isPast(props.availableAt);
    const availableAtDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm",{
        locale: pt
    });
    const { slug } = useParams<{ slug: string }>();

    const isActiveLesson = slug == props.slug;

    return (
        <Link to={`/event/lesson/${props.slug}`} className='group'>
            <span className="text-gray-300">
                {availableAtDateFormatted}
            </span>

            <div
                className={classNames('rounded border border-gray-500 p-4 group-hover:border-green-500', {
                    'bg-green-500': isActiveLesson
                })}
            >
                <header className="flex items-center justify-between">
                    {isLessonAvailable ? (
                        <span className={classNames('text-sm font-medium flex gap-2 items-center', {
                            'text-blue-500': !isActiveLesson,
                            'text-white': isActiveLesson
                        })}>
                            <CheckCircle size={20} />
                            Conteudo liberado
                        </span>
                    ) : (
                        <span className="text-sm text-orange-500 font-medium flex gap-2 items-center">
                            <Lock size={20} />
                            Em breve
                        </span>
                    )}
                    <span className={classNames('text-xs rounded px-2 py-[0.125rem] text-white border font-bold', {
                        'border-green-300': !isActiveLesson,
                        'border-white': isActiveLesson
                    })}>
                        {props.type == 'live' ? 'AO VIVO' : 'AULA PRATICA'}
                    </span>
                </header>

                <strong className={classNames('mt-5 block', {
                    'text-white': isActiveLesson,
                    'text-gray-200': !isActiveLesson
                })}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}