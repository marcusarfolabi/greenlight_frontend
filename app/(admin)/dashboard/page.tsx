"use client";

import { ArenaButton } from "@/app/components/common/ArenaButton";
import { Plus, Play, Edit3, Settings } from "lucide-react";

const MOCK_QUIZZES = [
    { id: "1", title: "Q1 Product Knowledge", participants: 142, status: "Draft" },
    { id: "2", title: "Global Sales Kickoff", participants: 0, status: "Ready" },
];

export default function AdminDashboard() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight">ADMIN ARENA</h1>
                    <p className="text-muted-foreground font-medium">Manage and host your live sessions</p>
                </div>
                <ArenaButton className="w-auto px-6">
                    <Plus className="w-5 h-5 mr-2" /> Create New Quiz
                </ArenaButton>
            </div>

            <div className="grid gap-4">
                {MOCK_QUIZZES.map((quiz) => (
                    <div key={quiz.id} className="bg-card border-2 border-border p-6 rounded-2xl flex items-center justify-between hover:border-primary transition-all">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold">{quiz.title}</h3>
                            <div className="flex gap-4 text-sm text-muted-foreground font-bold uppercase tracking-wider">
                                <span>{quiz.participants} Participants</span>
                                <span className={quiz.status === "Ready" ? "text-green-500" : "text-yellow-500"}>
                                    ● {quiz.status}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <ArenaButton variant="outline" size="sm" tooltip="Edit Quiz" className="w-12 h-12 p-0">
                                <Edit3 className="w-5 h-5" />
                            </ArenaButton>
                            <ArenaButton variant="outline" size="sm" tooltip="Settings" className="w-12 h-12 p-0">
                                <Settings className="w-5 h-5" />
                            </ArenaButton>
                            <ArenaButton size="sm" tooltip="Launch Quiz" className="bg-green-600 hover:bg-green-700 px-6">
                                <Play className="w-5 h-5 mr-2" /> Launch
                            </ArenaButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}